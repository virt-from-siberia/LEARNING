{
   type Obj = { label: string };
    const printLabel = (labeledObj: Obj) => {
        console.log(labeledObj.label);
    }
    let myObj = {size: 10, label: "Size 10 Object"};
    printLabel(myObj);
}