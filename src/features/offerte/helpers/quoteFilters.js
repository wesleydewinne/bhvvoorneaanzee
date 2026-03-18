export const quoteFilterTabs = [
    { key: "open", label: "Openstaand" },
    { key: "archived", label: "Archief" },
    { key: "all", label: "Alles" },
];

export function getFilterLabel(key) {
    const found = quoteFilterTabs.find((tab) => tab.key === key);
    return found?.label || key;
}