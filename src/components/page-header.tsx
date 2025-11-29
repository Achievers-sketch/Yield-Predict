import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

export default function PageHeader({ title, description, icon }: PageHeaderProps) {
  return (
    <div className="flex items-center space-x-4">
      {icon && <div className="hidden sm:block">{icon}</div>}
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{title}</h1>
        {description && (
          <p className="text-lg text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}
