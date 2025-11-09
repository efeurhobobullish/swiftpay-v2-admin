import { Header, MenuBar } from "@/components";


interface Props {
  children: React.ReactNode;
  title?: string;
}

const DashboardLayout = ({ children, title }: Props) => {
 

  return (
    <>
      <Header />
      <main className="layout space-y-4 pb-20 pt-4">
        {title && <h1 className="text-xl font-light">{title}</h1>}
        <div className="space-y-4 pb-20">{children}</div>
      </main>

      <MenuBar />
    </>
  );
};

export default DashboardLayout;
