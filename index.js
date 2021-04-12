const fetch = require('sync-fetch');
const Page = require("./_layout/Default");

module.exports = class extends Page {
    constructor(){
        super({title:"Home", sName:"Richard Hildred"});
    }
    render(sPage) {
        const oJson = fetch("https://fir-todo-4f614-default-rtdb.firebaseio.com/meals.json").json();
        console.log(oJson);
        let sResult = "<h1>Upcoming Popup Meals</h1>";
        Object.keys(oJson).map((key) => {
            const oEntity = oJson[key];
            console.log(oEntity);
            oEntity.id = key;
            sResult += `
            <h2>${oEntity.title}</h2>
            <p><img src="${oEntity.featured_image}" style="width:250px;height:150px" alt="${oEntity.title}"</p>
            <p>${oEntity.full_description}</p>
            <form action="https://dinnerchatbot.herokuapp.com/payment" method="post" target='_blank'>
            <input type="hidden" value="${oEntity.title}" name="title" id="title"/>
            <input type="tel" name="phone" placeholder="enter your number" />
            <button type="submit">Order now</button>
            </form>
            `;
        });
        return sResult;
    }
}