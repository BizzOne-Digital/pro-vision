import {
  Home,
  Landmark,
  HandCoins,
  ShieldCheck,
  Users,
  Building2,
  RefreshCw,
  KeyRound,
  MessageCircle,
  Award,
  Clock,
  MapPin,
  Heart,
  Phone,
  Mail,
  CheckCircle2,
  TrendingUp,
  FileText,
  Handshake,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  Home,
  Landmark,
  HandCoins,
  ShieldCheck,
  Users,
  Building2,
  RefreshCw,
  KeyRound,
  MessageCircle,
  Award,
  Clock,
  MapPin,
  Heart,
  Phone,
  Mail,
  CheckCircle2,
  TrendingUp,
  FileText,
  Handshake,
};

export const ICON_KEYS = Object.keys(ICON_MAP);

export function getIcon(key?: string): LucideIcon {
  if (key && ICON_MAP[key]) return ICON_MAP[key];
  return Home;
}
