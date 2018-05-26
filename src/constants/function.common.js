export const getDataForm = (form_data) => {
    let data = {};
    let validate = true;
    for(let prop in form_data) {
        const tmp = form_data[prop]._lastNativeText;
        validate = validate && tmp !== "" && tmp !== null && tmp !== undefined;
        if (validate) {
            data = {
                ...data,
                [prop]: tmp,
            }
        }
    }
    data = validate ? data : false;
    return data;
}