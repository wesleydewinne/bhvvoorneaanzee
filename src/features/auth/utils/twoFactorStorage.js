const TWO_FACTOR_STORAGE_KEY = "pendingTwoFactorState";

export function readPendingTwoFactorState() {
    try {
        const raw = sessionStorage.getItem(TWO_FACTOR_STORAGE_KEY);

        if (!raw) {
            return {
                requiresTwoFactor: false,
                requiresTwoFactorSetup: false,
            };
        }

        const parsed = JSON.parse(raw);

        return {
            requiresTwoFactor: Boolean(parsed.requiresTwoFactor),
            requiresTwoFactorSetup: Boolean(parsed.requiresTwoFactorSetup),
        };
    } catch {
        return {
            requiresTwoFactor: false,
            requiresTwoFactorSetup: false,
        };
    }
}

export function persistPendingTwoFactorState(requiresTwoFactor, requiresTwoFactorSetup) {
    sessionStorage.setItem(
        TWO_FACTOR_STORAGE_KEY,
        JSON.stringify({
            requiresTwoFactor: Boolean(requiresTwoFactor),
            requiresTwoFactorSetup: Boolean(requiresTwoFactorSetup),
        })
    );
}

export function clearPendingTwoFactorState() {
    sessionStorage.removeItem(TWO_FACTOR_STORAGE_KEY);
}