type SectionTransitionProps = {
  tone?: 'blue' | 'violet';
  direction?: 'left' | 'right';
};

export default function SectionTransition({
  tone = 'blue',
  direction = 'left',
}: SectionTransitionProps) {
  return (
    <div
      className={`section-transition section-transition--${tone} section-transition--${direction}`}
      aria-hidden="true"
    >
      <div className="section-transition__inner">
        <span className="section-transition__track" />
        <span className="section-transition__node" />
      </div>
    </div>
  );
}
