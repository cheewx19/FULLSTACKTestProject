let server;
async function startServer() {
    server = await require("../server")
}

startServer();
let chai = require("chai")
let chaiHttp = require("chai-http")

chai.should();
chai.use(chaiHttp);

//Inserting a product
describe("Test Insert Product /api/products", () => {
    it("it should return a JSON object of inserted product", (done) => {
        let product = {
            id: "10a08dbf-6901-4c9f-a856-9ac0084f4765",
            createdAt: "2021-03-30T08:00:30.859+00:00",
            updatedAt: "2021-03-30T08:00:30.859+00:00",
            name: "Product 1",
            price: 100.00,
            image: "http://s3-ap-southeast-1.amazonaws.com/s3.irvinsaltedegg.com/engineering-test/images/product-1.jpg",
            tags: ["tag1", "tag2"]
        }
        chai.request(server).post("/api/products").send(product).end((err,res) => {
            if (err) throw err;
            res.should.have.status(201);
            res.body.should.be.a('object');
            done();
        });
    })
})

//retrieving a product by id
describe("Test Retrieve Product By ID /api/products/:id", () => {
    it("it should return a JSON object of retrieved product", (done) => {
        let productId = "10a08dbf-6901-4c9f-a856-9ac0084f4765";
        chai.request(server).get("/api/products/" + productId).end((err,res) => {
            if (err) throw err;
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    })
})

//updating a product
describe("Test Update Product /api/products/:id", () => {
    it("it should return a JSON object of updated product", (done) => {
        let product = {
            id: "10a08dbf-6901-4c9f-a856-9ac0084f4765",
            createdAt: "2021-03-30T08:00:30.859+00:00",
            updatedAt: "2021-04-05T05:11:31.274+00:00",
            name: "Product 1 update",
            price: 120.00,
            image: "http://s3-ap-southeast-1.amazonaws.com/s3.irvinsaltedegg.com/engineering-test/images/product-1.jpg",
            tags: ["tag3"]
        }
        chai.request(server).post("/api/products/" + product.id).send(product).end((err,res) => {
            if (err) throw err;
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    })
})

//deleting a product by id
describe("Test Delete Product By ID /api/products/:id", () => {
    it("it should return a JSON object of deleted product Id", (done) => {
        let productId = "10a08dbf-6901-4c9f-a856-9ac0084f4765";
        chai.request(server).delete("/api/products/" + productId).end((err,res) => {
            if (err) throw err;
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    })
})
