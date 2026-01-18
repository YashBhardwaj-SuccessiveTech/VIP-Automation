describe("hooks", ()=>{

    before(async ()=>{
        console.log("Before method");
    })
    after(async ()=>{
        console.log("after method");
    })
    beforeEach(async ()=>{
        console.log("before each method");
    })
    afterEach(async ()=>{
        console.log("after each method");
    })
    it("TC1", ()=>{
        console.log("Test case one ");
    })
    it("TC2", ()=>{
        console.log("test case two");
    })

})

