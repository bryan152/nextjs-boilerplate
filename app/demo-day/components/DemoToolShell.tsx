type DemoToolShellProps = {
  label: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  task: string;
  children?: React.ReactNode;
};

export default function DemoToolShell({
  label,
  title,
  imageSrc,
  imageAlt,
  description,
  task,
  children,
}: DemoToolShellProps) {
  return (
    <article className="demo-tool-card card">
      <div className="demo-image-area">
        <img src={imageSrc} alt={imageAlt} />
      </div>

      <div className="demo-tool-content">
        <span className="badge badge-gold">{label}</span>
        <h2>{title}</h2>
        <p className="text-muted">{description}</p>

        <div className="demo-tool-task">
          <strong>User study task:</strong>
          <p>{task}</p>
        </div>

        {children}
      </div>
    </article>
  );
}