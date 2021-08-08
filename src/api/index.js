//View All Workers
export const getWorkers = async () => {
    return await fetch('http://localhost:5000/api/v1/worker', {
        method: "GET"
    }).then((res) => {
        return res.json()
    }).catch((error) => {
        console.log(error)
    })
}

//Add Worker
export const addWorker = async (data) => {
    return await fetch('http://localhost:5000/api/v1/worker', {
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    }).then((res) => {
        return res.json()
    }).catch((err) =>{
        console.log(err)
    })
}

//Update Worker
export const updateWorker = async (data, id) => {
    return await fetch(`http://localhost:5000/api/v1/worker/${id}`, {
        method: "PUT",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    }).then((res) => {
        return res.json()
    }).catch((err) =>{
        console.log(err)
    })
}

//View One Worker
export const getWorker = async (id) => {
    return await fetch(`http://localhost:5000/api/v1/worker/${id}`, {
        method: "GET"
    }).then((res) => {
        return res.json()
    }).catch((error) => {
        console.log(error)
    })
}

//Delete Worker
export const deleteWorker = async (id) => {
    return await fetch(`http://localhost:5000/api/v1/worker/${id}`, {
        method: "DELETE"
    }).then((res) => {
        return res.json()
    }).catch((error) => {
        console.log(error)
    })
}

//View All Tasks
export const getTasks = async () => {
    return await fetch('http://localhost:5000/api/v1/task', {
        method: "GET"
    }).then((res) => {
        return res.json()
    }).catch((error) => {
        console.log(error)
    })
}

//View Add Tasks
export const addTask = async (data) => {
    return await fetch('http://localhost:5000/api/v1/task', {
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    }).then((res) => {
        return res.json()
    }).catch((err) =>{
        console.log(err)
    })
}
//Delete Product
export const deleteProduct = async (id) => {
    return await fetch(`http://localhost:5000/api/v1/product/${id}`, {
        method: "DELETE"
    }).then((res) => {
        return res.json()
    }).catch((error) => {
        console.log(error)
    })
}

//View All Products
export const getProducts = async () => {
    return await fetch('http://localhost:5000/api/v1/product', {
        method: "GET"
    }).then((res) => {
        return res.json()
    }).catch((error) => {
        console.log(error)
    })
}

//Add Product
export const addProduct = async (data) => {
    return await fetch('http://localhost:5000/api/v1/product', {
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    }).then((res) => {
        return res.json()
    }).catch((err) =>{
        console.log(err)
    })
}

//Update Product
export const updateProduct = async (data, id) => {
    return await fetch(`http://localhost:5000/api/v1/product/${id}`, {
        method: "PUT",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    }).then((res) => {
        return res.json()
    }).catch((err) =>{
        console.log(err)
    })
}


//View Add Efficiency
export const addEfficiency = async (data) => {
    return await fetch('http://localhost:5000/api/v1/efficiency', {
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    }).then((res) => {
        return res.json()
    }).catch((err) =>{
        console.log(err)
    })
}
