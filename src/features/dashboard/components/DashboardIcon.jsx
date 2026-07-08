import {
    Award,
    BarChart3,
    Bell,
    BookOpen,
    BriefcaseBusiness,
    Building2,
    CalendarDays,
    ChevronRight,
    ClipboardCheck,
    Euro,
    FileText,
    GraduationCap,
    HelpCircle,
    Home,
    Inbox,
    LayoutDashboard,
    LifeBuoy,
    Mail,
    MapPin,
    MessageSquare,
    NotebookText,
    Plus,
    Receipt,
    Settings,
    ShieldCheck,
    Siren,
    Star,
    UserPlus,
    Users,
    Wrench,
} from "lucide-react";

const iconMap = {
    account: Settings,
    certificate: Award,
    certificates: Award,
    companies: BriefcaseBusiness,
    contact: Inbox,
    dashboard: LayoutDashboard,
    evaluations: Star,
    finance: Euro,
    invoices: Receipt,
    locations: MapPin,
    messages: Mail,
    planning: CalendarDays,
    profile: Settings,
    quality: ClipboardCheck,
    quotes: FileText,
    reports: BarChart3,
    reviews: Star,
    safety: ShieldCheck,
    security: ShieldCheck,
    training: GraduationCap,
    trainingen: GraduationCap,
    trainings: GraduationCap,
    users: Users,
    warning: Siren,
};

const fallbackMap = [
    ["invoice", Receipt],
    ["factuur", Receipt],
    ["quote", FileText],
    ["offerte", FileText],
    ["message", Mail],
    ["contact", Inbox],
    ["company", BriefcaseBusiness],
    ["bedrijf", BriefcaseBusiness],
    ["location", MapPin],
    ["locatie", MapPin],
    ["training", GraduationCap],
    ["course", GraduationCap],
    ["evaluat", Star],
    ["review", Star],
    ["user", Users],
    ["profile", Settings],
    ["safety", ShieldCheck],
    ["veilig", ShieldCheck],
    ["report", BarChart3],
    ["rapport", BarChart3],
    ["new", Plus],
    ["nieuw", Plus],
    ["elearning", BookOpen],
    ["techn", Wrench],
    ["building", Building2],
    ["team", Users],
];

export function DashboardIcon({ name, className, strokeWidth = 2.2, ...props }) {
    const normalizedName = String(name ?? "").toLowerCase();
    const Icon =
        iconMap[normalizedName] ??
        fallbackMap.find(([needle]) => normalizedName.includes(needle))?.[1] ??
        NotebookText;

    return (
        <Icon
            aria-hidden="true"
            className={className}
            strokeWidth={strokeWidth}
            {...props}
        />
    );
}

export function DashboardChevron({ className }) {
    return <ChevronRight aria-hidden="true" className={className} strokeWidth={2.4} />;
}

export function DashboardBell({ className }) {
    return <Bell aria-hidden="true" className={className} strokeWidth={2.2} />;
}

export function DashboardHelpIcon({ className }) {
    return <LifeBuoy aria-hidden="true" className={className} strokeWidth={2.2} />;
}

export function DashboardHomeIcon({ className }) {
    return <Home aria-hidden="true" className={className} strokeWidth={2.2} />;
}

export function DashboardUserPlusIcon({ className }) {
    return <UserPlus aria-hidden="true" className={className} strokeWidth={2.2} />;
}

export function DashboardCalendarIcon({ className }) {
    return <CalendarDays aria-hidden="true" className={className} strokeWidth={2.2} />;
}
