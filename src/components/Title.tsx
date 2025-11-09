import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface TitleProps {
  title: string;
  link?: string;
  linkText?: string;
}

const Title = ({ title, link, linkText }: TitleProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-sm font-medium">{title}</h1>
      <div>
        {link && (
          <Link
            to={link}
            className="text-sm font-medium flex items-center gap-1"
          >
            {linkText}
            <ChevronRight size={16} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Title;
