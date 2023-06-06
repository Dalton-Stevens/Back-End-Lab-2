let houseDB = require(`./db.json`);
let globalID = 4;

module.exports = {
    getHouses: (req,res) => {
        res.status(200).send(houseDB);
    },
    deleteHouse: (req,res) => {
        let {id} = req.params;
        let index = houseDB.findIndex(house => house.id === +id);
        houseDB.splice(index, 1);
        res.status(200).send(houseDB);
    },
    createHouse: (req,res) => {
        let {address, price, imageURL} = req.body;
        let newHouse = {
            address,
            price,
            imageURL,
            id: globalID
        };
        houseDB.push(newHouse);
        res.status(200).send(houseDB);
        globalID++;
    },
    updateHouse: (req,res) => {
        let {id} = req.params;
        let {type} = req.body;
        let index = houseDB.findIndex(house => house.id === +id);

        if(type === `minus` && houseDB[index].price <= 10000) {
            houseDB[index].price = 0;
        } else if(type === `plus`) {
            houseDB[index].price += 10000;
        } else if(type === `minus`) {
            houseDB[index].price -= 10000;
        } else {
            res.status(400).send(`Bad request!`);
            return;
        };
        res.status(200).send(houseDB);
    }
};