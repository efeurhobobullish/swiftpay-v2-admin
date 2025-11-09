interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

interface RegisterForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface LoginForm {
  email: string;
  password: string;
}

interface AirtimeForm {
  provider: string;
  amount: string;
  phone: string;
}

interface Transaction {
  id: string;
  amount: number;
  status: string;
  description: string;
  type: string;
  recipient: string;
  date: Date;
}

interface NetworkProvider {
  id: number;
  name: string;
  image: string;
}

interface DataPlan {
  planId: number;
  days: number;
  network: "MTN" | "Glo" | "Airtel" | "9mobile";
  planType: "daily" | "weekly" | "monthly";
  volume: number;
  price: number;
  extension: "MB" | "GB";
  planName: string;
}

interface DataForm {
  provider: string;
  plan: string;
  phone: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  wallet: number;
  isVerified: boolean;
  isAdmin: boolean;
  bankAccounts: [];
  createdAt: string;
  updatedAt: string;
}

interface TransactionType {
  user: {
    id: string;
    name: string;
    email: string;
  };
  id: string;
  amount: number;
  status: "pending" | "success" | "failed";
  type: "debit" | "credit";
  title: string;
  description: string;
  oldBalance: number;
  newBalance: number;
  transactionId: string;
  reference: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AirtimeProfitType {
  name: string;
  profit: number;
}
interface DataProfitType {
  name: string;
  profit: number;
}

interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  type: string;
  label?: string;
  error?: string;
}

interface ButtonWithLoaderProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  initialText: string;
  loadingText: string;
}

interface SelectWithIconProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon: React.ReactNode;
  label?: string;
  error?: string;
  defaultValue?: string;
  options: {
    label: string;
    value: string;
  }[];
}
