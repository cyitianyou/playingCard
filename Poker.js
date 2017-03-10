module.exports = exports = new Poker();

function Poker() {
    //牌堆
    this.cardPile = [];
    //弃牌堆
    this.discardPile = [];
    //当前出牌
    this.currentCard = null;
    //玩家
    this.players = [];
}
//Inherits from `EventObject`.
Poker.prototype.__proto__ = Object.prototype;

Poker.prototype.init = function() {
    var m = 52;
    var arr = new Array(m);
    for (var i = 0; i < m; i++) {
        arr[i] = i + 1;
    }
    //第i张与任意一张牌换位子，换完一轮即可
    for (var i = 0; i < m; i++) {
        var rnd = Math.floor(Math.random() * (i + 1)),
            temp = arr[rnd];
        arr[rnd] = arr[i];
        arr[i] = temp;
    }
    this.cardPile = arr;
    //弃牌堆
    this.discardPile = [];
    //当前出牌
    this.currentCard = null;
};

Poker.prototype.addPlayer = function(userid) {

};