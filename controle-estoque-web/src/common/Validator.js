export function IsNotNull(str) {
    let ok = false;
    try {
        if (
            str !== undefined &&
            str !== null &&
            str !== "" &&
            str !== {} &&
            str !== []
        ) {
            ok = true;
        } else {
            ok = false;
        }
    } catch (ex) {
        ok = false;
    }
    return ok;
}

export function ValorStr(valor = 0, casas = 3) {
    return parseFloat(valor).toFixed(casas).replace(".", ",");
}

export function FormatPhoneMask(v) {
    var r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
        // 11+ digits. Format as 5+4.
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    }
    else if (r.length > 5) {
        // 6..10 digits. Format as 4+4
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    }
    else if (r.length > 2) {
        // 3..5 digits. Add (0XX..)
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    }
    else {
        // 0..2 digits. Just add (0XX
        r = r.replace(/^(\d*)/, "($1");
    }
    return r;
}

export function FormateDate(date) {
    const d = new Date(date);
    const data =
        ('0' + d.getDate()).slice(-2) + '/'
        + ('0' + (d.getMonth() + 1)).slice(-2) + '/'
        + d.getFullYear();
    return data;
}