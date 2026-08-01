export function splitContactName(fullName) {
    const parts = String(fullName || "")
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (parts.length === 0) {
        return { firstName: "", lastName: "" };
    }

    return {
        firstName: parts[0],
        lastName: parts.slice(1).join(" "),
    };
}

export function joinContactName(firstName, lastName) {
    return [firstName, lastName]
        .map((part) => String(part || "").trim())
        .filter(Boolean)
        .join(" ");
}
