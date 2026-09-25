---
title: "Integraciones Críticas: Cómo Conectar Tu ERP a Medida con el Resto de Tu Stack"
date: "2026-10-03"
language: "es"
canonical: "https://legasint.com/blog/integraciones-erp-a-medida"
tags: ["ERP a medida", "integraciones", "APIs", "webhooks", "arquitectura"]
---

# Integraciones Críticas: Cómo Conectar Tu ERP a Medida con el Resto de Tu Stack

Guía práctica para integrar un ERP a medida con CRM, e-commerce, producción y otros sistemas: APIs, webhooks, ETL y patrones de arquitectura.

## El ERP No Vive Solo — Y Cada Integración Es un Punto de Fallo de €10.000

**Una empresa perdió €50.000 en pedidos porque la integración ERP-e-commerce falló silenciosamente durante 3 días.**

Un ERP a medida es el corazón de tu operativa. Pero no late en soledad.

Necesita hablar con:
- **CRM** para sincronizar clientes y oportunidades
- **E-commerce** para gestionar pedidos online
- **Producción** para planificar y trackear fabricación
- **Logística** para coordinar envíos y almacenes
- **Contabilidad** para cerrar el ciclo financiero
- **RRHH** para gestionar turnos y nóminas

Cada integración es un punto de fallo potencial. Este artículo te da los patrones y mejores prácticas para que tus integraciones sean robustas, escalables y mantenibles. Con ejemplos de código, casos reales y errores que debes evitar.

---

## Tipos de Integración: Cuándo Usar Cada Uno

### 1. API REST (Síncrona)

**Qué es:** Tu ERP hace una petición HTTP a otro sistema y espera respuesta inmediata.

**Cuándo usarlo:**
- Consultas en tiempo real (¿hay stock de X?)
- Operaciones que requieren confirmación inmediata (crear pedido)
- Volumen bajo-medio (cientos de peticiones/minuto)

**Ejemplo:**
```javascript
// ERP consulta stock en tiempo real a WMS
const response = await fetch('https://wms.empresa.com/api/stock/SKU123', {
  headers: { 'Authorization': 'Bearer ' + apiKey }
});
const { disponible } = await response.json();
```

**Ventajas:** Simple, inmediato, fácil de debuggear.
**Desventajas:** Acoplamiento temporal. Si el otro sistema cae, tu ERP se bloquea.

---

### 2. Webhooks (Asíncrono)

**Qué es:** El otro sistema envía una notificación a tu ERP cuando ocurre un evento.

**Cuándo usarlo:**
- Eventos que no requieren respuesta inmediata (pedido creado, cliente actualizado)
- Volumen alto (miles de eventos/hora)
- Sistemas externos que deben notificar cambios

**Ejemplo:**
```javascript
// E-commerce notifica a ERP cuando hay pedido nuevo
app.post('/webhooks/pedidos', async (req, res) => {
  const { pedidoId, cliente, items } = req.body;
  
  // Validar firma del webhook (crítico para seguridad)
  if (!validarFirma(req.headers['x-signature'], req.body)) {
    return res.status(401).send('Firma inválida');
  }
  
  // Procesar asíncronamente (no bloquear respuesta)
  procesarPedido(pedidoId, cliente, items)
    .catch(err => logger.error('Error procesando pedido', err));
  
  res.status(200).send('OK'); // Responder inmediatamente
});
```

**Ventajas:** Desacoplamiento, escalabilidad, resiliencia.
**Desventajas:** Complejidad de reintentos, orden de eventos, idempotencia.

---

### 3. Message Queue (Cola de Mensajes)

**Qué es:** Los sistemas se comunican mediante una cola intermediaria (RabbitMQ, Kafka, SQS).

**Cuándo usarlo:**
- Alto volumen (miles-millones de eventos/día)
- Procesamiento por lotes (batch)
- Desacoplamiento total entre sistemas

**Arquitectura:**
```
┌─────────┐     ┌─────────────┐     ┌─────────┐
│  ERP    │────▶│  Message    │────▶│  CRM    │
│         │     │  Queue      │     │         │
└─────────┘     └─────────────┘     └─────────┘
                      │
                ┌─────────┐
                │Consumer │
                │(Worker) │
                └─────────┘
```

**Ventajas:** Máxima resiliencia, escalabilidad horizontal, replay de eventos.
**Desventajas:** Complejidad operativa, latencia adicional.

---

### 4. ETL (Extract, Transform, Load)

**Qué es:** Proceso batch que extrae datos de un sistema, los transforma y los carga en otro.

**Cuándo usarlo:**
- Sincronización de datos maestros (clientes, productos)
- Reporting y business intelligence
- Migraciones de datos
- Sistemas sin API (legacy)

**Herramientas:**
- **Airbyte** (open source, 300+ conectores)
- **Fivetran** (gestionado, fácil)
- **Custom scripts** (Python, Node.js)

**Frecuencia típica:** Cada hora, cada noche, cada semana.

---

## Patrones de Integración para ERP

### Patrón 1: API Gateway

Centraliza todas las integraciones detrás de un único punto de entrada.

```
┌─────────┐
│   ERP   │
└────┬────┘
     │
┌────▼────┐
│   API   │
│ Gateway │◀──── Rate limiting, auth, logging
└────┬────┘
     │
  ┌──┴──┬────────┬────────┐
  ▼     ▼        ▼        ▼
 CRM  E-commerce WMS   Contab.
```

**Ventajas:** Control centralizado, seguridad unificada, monitoreo.
**Herramientas:** Kong, Apigee, AWS API Gateway, Azure API Management.

---

### Patrón 2: Event-Driven Architecture (EDA)

Los sistemas se comunican mediante eventos, no llamadas directas.

**Ejemplo de flujo:**
1. Cliente crea pedido en e-commerce
2. E-commerce publica evento `PedidoCreado`
3. ERP consume evento y crea pedido interno
4. ERP publica evento `PedidoConfirmado`
5. WMS consume evento y reserva stock
6. WMS publica evento `StockReservado`
7. ERP actualiza estado del pedido

**Ventajas:** Desacoplamiento total, escalabilidad, auditabilidad.
**Desventajas:** Complejidad de debugging, consistencia eventual.

---

### Patrón 3: CQRS (Command Query Responsibility Segregation)

Separa operaciones de escritura (commands) de lectura (queries).

**En integraciones ERP:**
- **Commands:** Crear pedido, actualizar cliente, confirmar pago
- **Queries:** Consultar stock, obtener histórico de pedidos, calcular margen

**Por qué importa:** Puedes optimizar cada lado independientemente. Las queries pueden ir a una réplica de lectura. Los commands pueden encolarse para procesamiento asíncrono.

---

## Integraciones Críticas: Casos Prácticos

### 1. ERP ↔ CRM

**Datos a sincronizar:**
- Clientes (alta, modificación, baja)
- Oportunidades de venta
- Histórico de interacciones

**Patrón recomendado:** Webhooks bidireccionales con cola de mensajes.

**Flujo:**
1. Comercial cierra oportunidad en CRM
2. CRM publica evento `OportunidadGanada`
3. ERP consume evento y crea cliente + pedido
4. ERP publica evento `ClienteCreado` con ID interno
5. CRM actualiza oportunidad con referencia de ERP

**Errores comunes:**
- Sincronización bidireccional sin reglas de conflicto (¿qué sistema manda?)
- No manejar bajas (¿qué pasa si se elimina en un sistema?)

**Solución:** Define un sistema como "master" para cada entidad. Clientes: CRM es master. Pedidos: ERP es master.

---

### 2. ERP ↔ E-commerce

**Datos a sincronizar:**
- Catálogo de productos (SKU, precios, stock)
- Pedidos online
- Estados de envío
- Devoluciones

**Patrón recomendado:** API REST para consultas + Webhooks para eventos.

**Flujo de pedido:**
1. Cliente compra en web
2. E-commerce llama a API de ERP: `POST /api/pedidos`
3. ERP valida stock, crea pedido, reserva stock
4. ERP responde con `pedidoId` y `estado`
5. E-commerce muestra confirmación al cliente

**Flujo de stock:**
1. ERP actualiza stock de producto
2. ERP llama a API de e-commerce: `PUT /api/products/SKU123/stock`
3. E-commerce actualiza disponibilidad en web

**Errores comunes:**
- No validar stock en tiempo real (overselling)
- No manejar concurrencia (dos clientes compran el último item)

**Solución:** Reserva de stock temporal (soft hold) durante checkout.

---

### 3. ERP ↔ Producción (MES)

**Datos a sincronizar:**
- Órdenes de producción
- Consumo de materiales
- Avance de fabricación
- Calidad y trazabilidad

**Patrón recomendado:** Message Queue (alto volumen, eventos frecuentes).

**Flujo:**
1. ERP crea orden de producción y publica en cola
2. MES (Manufacturing Execution System) consume orden
3. MES reporta avance cada 15 minutos (eventos `ProduccionAvance`)
4. ERP actualiza estado y consume materiales virtualmente
5. MES reporta finalización (evento `ProduccionCompletada`)
6. ERP da de alta stock de producto terminado

**Errores comunes:**
- No manejar rechazos de calidad (¿qué pasa con el material defectuoso?)
- No trazar lotes (¿de qué lote de materiales salió este producto?)

**Solución:** Eventos de calidad con trazabilidad bidireccional (forward y backward traceability).

---

### 4. ERP ↔ Contabilidad

**Datos a sincronizar:**
- Asientos contables (ventas, compras, nóminas)
- Facturas emitidas y recibidas
- Pagos y cobros
- Cierres de ejercicio

**Patrón recomendado:** ETL batch (nightly) o API REST para asientos en tiempo real.

**Flujo batch (nightly):**
1. ERP extrae todas las transacciones del día
2. Transforma a formato contable (plan de cuentas, centros de coste)
3. Carga en sistema contable vía API o fichero

**Flujo real-time (asientos críticos):**
1. ERP crea factura
2. ERP llama a API contable: `POST /api/asientos`
3. Contabilidad registra asiento y devuelve número de asiento
4. ERP guarda referencia para conciliación

**Errores comunes:**
- No cuadrar partidas dobles (debe/haber)
- No manejar diferencias de redondeo
- No conciliar con bancos

**Solución:** Validación contable en ERP antes de enviar. Conciliación automatizada con extractos bancarios.

---

## Mejores Prácticas para Integraciones Robustas

### 1. Idempotencia

Toda operación debe poder repetirse sin efectos secundarios.

```javascript
// ✅ BIEN: Idempotente (mismo resultado si se ejecuta 1 o N veces)
app.post('/api/pedidos', async (req, res) => {
  const { idempotencyKey, ...pedidoData } = req.body;
  
  // Verificar si ya existe
  const existente = await db.pedidos.findOne({ idempotencyKey });
  if (existente) {
    return res.status(200).json(existente); // Devolver el mismo resultado
  }
  
  // Crear nuevo
  const pedido = await db.pedidos.create({ idempotencyKey, ...pedidoData });
  res.status(201).json(pedido);
});
```

### 2. Reintentos con Backoff Exponencial

Si una llamada falla, reintenta con espera creciente.

```javascript
async function llamarConReintentos(url, options, maxReintentos = 3) {
  for (let i = 0; i < maxReintentos; i++) {
    try {
      return await fetch(url, options);
    } catch (err) {
      if (i === maxReintentos - 1) throw err;
      const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s
      await new Promise(r => setTimeout(r, delay));
    }
  }
}
```

### 3. Circuit Breaker

Si un sistema externo falla repetidamente, deja de llamarlo temporalmente.

```javascript
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.failures = 0;
    this.threshold = threshold;
    this.timeout = timeout;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
  }
  
  async call(fn) {
    if (this.state === 'OPEN') {
      throw new Error('Circuit breaker is OPEN');
    }
    
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (err) {
      this.onFailure();
      throw err;
    }
  }
  
  onSuccess() {
    this.failures = 0;
    this.state = 'CLOSED';
  }
  
  onFailure() {
    this.failures++;
    if (this.failures >= this.threshold) {
      this.state = 'OPEN';
      setTimeout(() => { this.state = 'HALF_OPEN'; }, this.timeout);
    }
  }
}
```

### 4. Logging y Monitoreo

Toda integración debe ser observable.

```javascript
// Log estructurado para integraciones
logger.info({
  event: 'integracion.pedido.creado',
  source: 'ecommerce',
  destination: 'erp',
  pedidoId: '12345',
  duration: 245, // ms
  status: 'success'
});
```

**Métricas clave:**
- Latencia (p95, p99)
- Tasa de error
- Volumen de peticiones
- Tamaño de cola (si aplica)

**Herramientas:** Datadog, New Relic, Grafana, CloudWatch.

### 5. Versionado de APIs

Nunca rompas integraciones existentes.

```
/api/v1/pedidos     # Versión original (deprecated pero funcional)
/api/v2/pedidos     # Nueva versión con breaking changes
```

**Estrategia:**
- Mantener versiones antiguas al menos 12 meses
- Notificar a consumidores con antelación
- Usar headers para versionado alternativo: `Accept: application/vnd.erp.v2+json`

---

## Errores Comunes en Integraciones ERP

### Error 1: Acoplamiento Temporal

ERP llama a CRM y espera respuesta. Si CRM cae, ERP se bloquea.

**Solución:** Cola de mensajes o circuit breaker.

### Error 2: No Manejar Duplicados

Webhook de e-commerce llega dos veces (retry). Se crean dos pedidos.

**Solución:** Idempotency keys y deduplicación.

### Error 3: Sin Dead Letter Queue

Mensajes que fallan se pierden o bloquean la cola.

**Solución:** DLQ para inspección manual y reprocessing.

### Error 4: No Versionar

Cambias la API y rompes integraciones de producción.

**Solución:** Versionado semántico y deprecación gradual.

### Error 5: Sin Monitoreo

Integración falla silenciosamente durante días.

**Solución:** Alertas en tiempo real (PagerDuty, Opsgenie).

---

## Checklist: Integración Robusta

- [ ] Uso idempotency keys para operaciones críticas
- [ ] Implemento reintentos con backoff exponencial
- [ ] Tengo circuit breaker para sistemas externos
- [ ] Todas las integraciones están loggeadas y monitoreadas
- [ ] Tengo dead letter queue para mensajes fallidos
- [ ] Mis APIs están versionadas y documentadas (OpenAPI/Swagger)
- [ ] Tengo estrategia de manejo de errores y conflictos
- [ ] He definido qué sistema es "master" para cada entidad
- [ ] Tengo runbooks para incidentes de integración

---

## Conclusión

Las integraciones son el tejido conectivo de tu ERP a medida. Mal diseñadas, son fuente de dolores de cabeza constantes. Bien diseñadas, son invisibles y robustas.

La clave es elegir el patrón correcto para cada caso, implementar resiliencia desde el principio y monitorear todo.

**¿Estás diseñando las integraciones de tu ERP?**

No esperes a que fallen. Diseña para que no fallen desde el día 1. En 45 minutos revisamos tu arquitectura actual y te damos un plan para integraciones robustas, escalables y mantenibles.

**[Diseña integraciones que no fallen →](/contacto)**

---

*¿Conoces a alguien con integraciones frágiles que fallan cada semana? Compártelo.*
