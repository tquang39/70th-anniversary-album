import type { FC } from "react";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  badge?: string;
};

export const SectionHeading: FC<Props> = ({ eyebrow, title, description, badge }) => {
  return (
    <div className="section-heading">
      <div className="section-heading-top">
        <p className="eyebrow">{eyebrow}</p>
        {badge && <span className="section-badge">{badge}</span>}
      </div>
      <h2>{title}</h2>
      {description && <p className="section-lead">{description}</p>}
    </div>
  );
};