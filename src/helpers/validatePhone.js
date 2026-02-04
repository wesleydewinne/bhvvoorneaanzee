const clean = (num) => num.replace(/[\s\-()]/g, "");

export const validatePhone = (num) => {
    if (!num) return false;

    const n = clean(num);

    // ----------- NL --------------
    const nlMobiel = /^(\+31|0)6\d{8}$/;
    const nlVast   = /^(\+31|0)[1-9]\d{8}$/;

    if (nlMobiel.test(n) || nlVast.test(n)) return true;

    // ----------- BE --------------
    const bePattern = /^(\+32|0)(4\d{8}|[1-9]\d{7})$/;
    if (bePattern.test(n)) return true;

    // ----------- DE --------------
    const dePattern = /^(\+49|0)(1\d{8,10}|[2-9]\d{8,10})$/;
    if (dePattern.test(n)) return true;

    // ----------- UK --------------
    const ukPattern = /^(\+44|0)(7\d{9}|[1-2]\d{9})$/;
    if (ukPattern.test(n)) return true;

    return false;
};
