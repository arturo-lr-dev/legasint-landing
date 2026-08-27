---
title: "Cómo auditar el código que te entregó tu anterior proveedor"
date: "2026-02-10"
language: "es"
canonical: "https://legasint.com/blog/como-auditar-codigo-proveedor"
tags: ["Auditoría de Código", "Calidad de Software", "Deuda Técnica"]
---

# Cómo auditar el código que te entregó tu anterior proveedor

Guía práctica para evaluar la calidad del código heredado y tomar decisiones informadas sobre refactorización o migración.

## La situación

Contratas a un nuevo desarrollador o consultora, les pasas el código que te entregó tu anterior proveedor, y te dicen: **"Esto es un desastre, hay que rehacerlo todo"**.

¿Están siendo honestos o solo quieren venderte un proyecto más grande?

Esta guía te ayudará a **auditar el código tú mismo** (sin ser programador) y entender qué es real y qué es teatro.

## ¿Por qué auditar el código heredado?

Antes de tomar decisiones costosas, necesitas respuestas a:

- **¿El código funciona?** ¿Cumple con los requisitos actuales?
- **¿Es mantenible?** ¿Se puede evolucionar sin rehacerlo?
- **¿Hay deuda técnica crítica?** ¿Qué tan urgente es resolverla?
- **¿Vale la pena invertir en mejorarlo?** ¿O es mejor empezar de cero?

Una auditoría técnica te da **evidencia objetiva** para tomar decisiones informadas.

## Señales de alerta (red flags)

Incluso sin conocimientos técnicos profundos, puedes detectar problemas evidentes:

### 🚩 1. Falta de documentación

Si no hay:
- README explicando cómo ejecutar el proyecto
- Comentarios en el código
- Guías de instalación/configuración
- Documentación de APIs o arquitectura

**Esto significa:** Dependencia total del proveedor anterior. Nadie más puede trabajar en esto sin invertir semanas en entenderlo.

### 🚩 2. Código sin estructura clara

```
proyecto/
├── archivo1.js
├── archivo2.js
├── cosa.js
├── utils.js
├── final_final_v2.js
└── prueba123.js
```

**Archivos con nombres genéricos, sin organización, sin carpetas.** Señal de código improvisado sin planificación.

### 🚩 3. Versiones obsoletas

Ejecuta:
```bash
npm outdated  # Para proyectos JavaScript
pip list --outdated  # Para Python
```

Si las dependencias tienen **años de antigüedad**, estás usando tecnología con:
- Vulnerabilidades de seguridad
- Falta de soporte oficial
- Incompatibilidades con sistemas modernos

### 🚩 4. No hay control de versiones (Git)

Pregunta: **¿El proyecto está en Git/GitHub/GitLab?**

Si no existe historial de cambios:
- No puedes revertir errores
- No sabes quién cambió qué ni cuándo
- Imposible trabajar en equipo

**Esto es básico.** No tenerlo es negligencia profesional.

### 🚩 5. Código duplicado en todas partes

Si encuentras el **mismo código repetido** en múltiples archivos:
- Dificulta el mantenimiento (cambiar algo requiere editar 10 lugares)
- Aumenta los errores (olvidas actualizar una copia)
- Señal de falta de experiencia o prisa

## La auditoría paso a paso

### Paso 1: Inventario inicial

Antes de abrir el código, recopila:

- **¿Qué tecnología usa?** (React, Laravel, Python, etc.)
- **¿Dónde está desplegado?** (AWS, servidor propio, hosting compartido)
- **¿Hay acceso a todo?** (código fuente, base de datos, servidor, dominio)
- **¿Funciona actualmente?** (usuarios reales usándolo, bugs conocidos)

**Documenta todo.** Esto es tu línea base.

### Paso 2: Análisis automatizado

Usa herramientas que detectan problemas sin ser experto:

**Para JavaScript/TypeScript:**
```bash
# Instalar ESLint (linter que detecta errores)
npm install -g eslint
eslint . --max-warnings 0

# SonarQube (análisis de calidad)
# Versión gratuita detecta bugs, vulnerabilidades, code smells
```

**Para Python:**
```bash
# Pylint (analiza calidad del código)
pip install pylint
pylint tu_proyecto/

# Bandit (detecta problemas de seguridad)
pip install bandit
bandit -r tu_proyecto/
```

**Interpreta los resultados:**
- **Errores críticos:** Bugs reales, vulnerabilidades de seguridad
- **Warnings:** Malas prácticas, deuda técnica
- **Code smells:** Código difícil de mantener

**Número aceptable de errores:** Depende del tamaño, pero si un proyecto pequeño tiene +500 warnings, hay problemas serios.

### Paso 3: Auditoría manual (con ayuda)

Contrata a un **desarrollador senior freelance** por 2-4 horas para que revise:

1. **Arquitectura general:**
   - ¿Está bien organizado?
   - ¿Separa lógica de negocio, datos y presentación?

2. **Calidad del código:**
   - ¿Es legible?
   - ¿Usa buenas prácticas del lenguaje/framework?
   - ¿Hay tests automatizados?

3. **Seguridad:**
   - ¿Protege contra inyecciones SQL?
   - ¿Valida datos de entrada?
   - ¿Maneja bien las credenciales?

4. **Rendimiento:**
   - ¿Hay consultas a base de datos ineficientes?
   - ¿Carga rápido o es lento?

**Pide un informe escrito** con:
- Problemas encontrados (críticos vs mejoras)
- Estimación de esfuerzo para arreglarlo
- Recomendación: ¿refactorizar o rehacer?

### Paso 4: Validación funcional

Más allá del código, verifica **qué hace realmente la aplicación**:

- **¿Cumple con los requisitos originales?**
- **¿Tiene bugs conocidos?** ¿Se reportaron y nunca se arreglaron?
- **¿Puede escalar?** ¿Aguantará 10x usuarios?
- **¿Hay funciones a medias?** Código que nunca se terminó

**Crea una lista de funcionalidades vs estado real:**

| Funcionalidad     | Especificado | Implementado | Funciona | Bugs |
|-------------------|--------------|--------------|----------|------|
| Login de usuarios | ✅           | ✅           | ✅       | -    |
| Exportar PDF      | ✅           | ✅           | ❌       | Lento, se rompe |
| Notificaciones    | ✅           | ❌           | -        | No existe |

Esto te da una **visión realista** de qué tienes realmente.

## Preguntas clave para tu auditor

Cuando contratas al freelance senior, pregúntale:

1. **"¿Esto se puede mantener o hay que rehacerlo?"**
   - Espera una respuesta matizada, no un "sí/no" binario

2. **"¿Cuánto costaría arreglarlo vs rehacerlo?"**
   - Compara opciones con números reales

3. **"¿Qué es lo más urgente que debe arreglarse?"**
   - Prioriza riesgos críticos (seguridad, bugs graves)

4. **"¿Este código es rescatable a largo plazo?"**
   - Mira más allá del corto plazo

5. **"¿Trabajarías tú en este código?"**
   - Respuesta honesta de si es viable o un infierno

## Decisión: ¿Refactorizar o rehacer?

Después de la auditoría, tendrás que elegir:

### ✅ Refactorizar (mejorar el código existente) si:

- El código **funciona bien** para usuarios
- La arquitectura base **es sólida**
- Los problemas son **localizados** (se pueden arreglar por partes)
- **Presupuesto limitado** y necesitas resultados rápidos
- Tienes **documentación o conocimiento** del sistema actual

**Ventajas:** Menor costo, menor riesgo, mantiene funcionalidad existente.

### 🔄 Rehacer desde cero si:

- El código es **completamente inmantenible**
- Tecnología **obsoleta** sin futuro
- **Bugs críticos** en todas partes
- Falta de **seguridad** básica
- El costo de arreglarlo **supera** el de rehacerlo
- Necesitas **cambiar radicalmente** la funcionalidad

**Ventajas:** Empezar limpio, tecnología moderna, mejor arquitectura.

### Opción intermedia: **Reescritura incremental**

- Mantén el sistema actual funcionando
- Reescribe módulos uno por uno
- Reemplaza gradualmente partes viejas por nuevas
- Reduce riesgo y permite valor continuo

**Ideal cuando:** El sistema es crítico y no puedes parar operaciones.

## Lista de verificación de auditoría

Usa esto como checklist al revisar código heredado:

**Documentación:**
- [ ] Existe README con instrucciones de instalación
- [ ] Hay documentación de arquitectura
- [ ] Las APIs están documentadas
- [ ] Existen diagramas o especificaciones

**Control de versiones:**
- [ ] El proyecto usa Git
- [ ] Historial de commits tiene sentido
- [ ] Hay ramas organizadas (main, develop, etc.)
- [ ] Commits tienen mensajes descriptivos

**Dependencias y tecnología:**
- [ ] Dependencias están actualizadas (o máximo 1 año antiguas)
- [ ] No usa tecnologías abandonadas
- [ ] Versiones de lenguajes son soportadas oficialmente

**Calidad de código:**
- [ ] Código está organizado en carpetas lógicas
- [ ] Nombres de archivos/variables son claros
- [ ] No hay código duplicado masivamente
- [ ] Existe separación de responsabilidades

**Tests:**
- [ ] Existen tests automatizados
- [ ] Tests pasan exitosamente
- [ ] Cobertura de tests >50%

**Seguridad:**
- [ ] No hay credenciales hardcodeadas
- [ ] Usa HTTPS
- [ ] Valida inputs de usuario
- [ ] Tiene protección contra ataques comunes (SQL injection, XSS)

**Rendimiento:**
- [ ] La app carga en menos de 3 segundos
- [ ] No hay consultas extremadamente lentas
- [ ] Imágenes/assets están optimizados

## Errores comunes al auditar

❌ **"Mi nuevo proveedor dice que es un desastre, así que debe serlo"**
   → Consigue una segunda opinión. Algunos buscan vender proyectos grandes.

❌ **"El código es feo, hay que rehacerlo"**
   → "Feo" no significa "malo". Código funcional y feo > código bonito y roto.

❌ **"Usaron PHP/jQuery/X tecnología antigua, es basura"**
   → Tecnología "vieja" no es sinónimo de mala. ¿Funciona? ¿Es mantenible? Eso importa más.

❌ **"Tiene algunos bugs, hay que tirarlo todo"**
   → Todos los proyectos tienen bugs. Evalúa la gravedad, no la cantidad.

❌ **"No entiendo el código, debe estar mal"**
   → Falta de documentación ≠ código malo. Puede ser solo difícil de abordar inicialmente.

## Conclusión

Auditar el código heredado **no es opcional** si quieres tomar decisiones informadas sobre tu tecnología.

**Pasos clave:**
1. Recopila información y accesos
2. Usa herramientas automatizadas para detectar problemas
3. Contrata un experto externo para revisión manual
4. Compara costo de refactorizar vs rehacer
5. Decide basándote en **evidencia**, no en opiniones

Recuerda: **el código perfecto no existe**. La pregunta no es "¿está bien?", sino "¿es suficientemente bueno para lo que necesitamos?".

Un buen auditor te dirá los problemas reales, los costos de arreglarlos, y te ayudará a priorizar. Un mal auditor solo dirá "hay que rehacerlo todo" sin análisis.

**Busca evidencia, números concretos, y opciones realistas.** Así tomarás la mejor decisión para tu negocio.
