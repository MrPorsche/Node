// Challange: Conver into async/await
MyFunction() {
    request((result, err) => console.log(result, err))
}


async MyFunction() {
    try {
        let result = await request();
    } catch (err) {
        console.log(err)
        
    }
}
