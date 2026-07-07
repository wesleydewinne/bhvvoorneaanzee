function toBase64Url(buffer) {
    if (!buffer) {
        return null;
    }

    const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    let binary = "";

    for (let i = 0; i < bytes.byteLength; i += 0x8000) {
        const chunk = bytes.subarray(i, Math.min(i + 0x8000, bytes.byteLength));
        binary += String.fromCharCode(...chunk);
    }

    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value) {
    if (!value) {
        return null;
    }

    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padding = normalized.length % 4;
    const padded = padding === 0 ? normalized : normalized + "=".repeat(4 - padding);

    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i += 1) {
        bytes[i] = binary.charCodeAt(i);
    }

    return bytes.buffer;
}

function normalizeBinaryValue(value, key) {
    if (typeof value !== "string") {
        return value;
    }

    const binaryKeys = new Set(["challenge", "userHandle", "id"]);

    if (!binaryKeys.has(key)) {
        return value;
    }

    try {
        return fromBase64Url(value);
    } catch {
        return value;
    }
}

export function normalizePasskeyOptions(options) {
    if (!options || typeof options !== "object") {
        return options;
    }

    const publicKey = options.publicKey ?? options;

    const challenge = publicKey.challenge
        ? normalizeBinaryValue(publicKey.challenge, "challenge")
        : publicKey.challenge;

    const user = publicKey.user
        ? {
            ...publicKey.user,
            id: publicKey.user.id ? normalizeBinaryValue(publicKey.user.id, "id") : publicKey.user.id,
        }
        : publicKey.user;

    const allowCredentials = publicKey.allowCredentials?.map((credential) => ({
        ...credential,
        id: credential.id ? normalizeBinaryValue(credential.id, "id") : credential.id,
    }));

    const excludeCredentials = publicKey.excludeCredentials?.map((credential) => ({
        ...credential,
        id: credential.id ? normalizeBinaryValue(credential.id, "id") : credential.id,
    }));

    return {
        ...publicKey,
        challenge,
        user,
        allowCredentials,
        excludeCredentials,
    };
}

export function serializePasskeyCredential(credential) {
    if (!credential) {
        return null;
    }

    const response = credential.response ?? {};

    return {
        id: credential.id,
        rawId: toBase64Url(credential.rawId),
        type: credential.type,
        authenticatorAttachment: credential.authenticatorAttachment,
        clientExtensionResults: credential.getClientExtensionResults?.() ?? {},
        response: {
            clientDataJSON: toBase64Url(response.clientDataJSON),
            authenticatorData: response.authenticatorData ? toBase64Url(response.authenticatorData) : undefined,
            signature: response.signature ? toBase64Url(response.signature) : undefined,
            userHandle: response.userHandle ? toBase64Url(response.userHandle) : undefined,
            attestationObject: response.attestationObject ? toBase64Url(response.attestationObject) : undefined,
            transports: response.transports,
        },
    };
}

export function isPasskeySupported() {
    return typeof window !== "undefined" && Boolean(window.PublicKeyCredential);
}
