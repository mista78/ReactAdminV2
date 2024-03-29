const updatePropertyById = (id, test, property, value) => {
 /*    console.log("updateID", id);
    console.log("updateTest", test);
    console.log("updateProp", property);
    console.log("updateVal", value); */
    if (test.id == id) {
        if (property === null) {
            test = value
        } else {
            test[property] = value;
        }
    }
    if (test.children !== undefined && test.children.length > 0) {
        for (let i = 0; i < test.children.length; i++) {
            test.children[i] = updatePropertyById(id, test.children[i], property, value);
        }
    }
    return test;
}
export default updatePropertyById;