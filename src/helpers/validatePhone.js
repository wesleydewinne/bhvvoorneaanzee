// Verwijder spaties en streepjes
const clean = (num) => num.replace(/[\s\-()]/g, "");

export const validatePhone = (num) => {
    const n = clean(num);

    // ----------- NL --------------
    // +316xxxxxxxx of 06xxxxxxxx
    const nlMobiel = /^(\+31|0)6\d{8}$/;
    // +3110xxxxxxx of 010xxxxxxx etc.
    const nlVast = /^(\+31|0)[1-9]\d{1}\d{6,7}$/;

    if (nlMobiel.test(n) || nlVast.test(n)) return true;

    // ----------- BE --------------
    const bePattern = /^(\+32|0)(4\d{8}|[1-9]\d{1}\d{6})$/;
    if (bePattern.test(n)) return true;

    // ----------- DE --------------
    const dePattern = /^(\+49|0)(1\d{8,10}|[2-9]\d{2,10})$/;
    if (dePattern.test(n)) return true;

    // ----------- UK --------------
    const ukPattern = /^(\+44|0)(7\d{9}|[1-2]\d{8,9})$/;
    if (ukPattern.test(n)) return true;

    return false;
};
