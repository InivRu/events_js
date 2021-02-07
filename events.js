/**
 * Created by PhpStorm.
 * User: Арсений
 * Date: 08.11.2020
 * Time: 20:12
 *
 * Обработка событий
 *
 * Events.add('onOrder', function(data) {
 *     console.log('Номер заказа' + data.number);
 * });
 *
 * Events.do('onOrder', {number: 1});
 */

class Events {
    listEvents = {};

    add(name, callback, once = false, event_id = "", description = "") {
        if (name && callback) {
            if (typeof this.listEvents[name] === "undefined") {
                this.listEvents[name] = [];
            }

            this.listEvents[name].push({
                id: event_id,
                callback: callback,
                once: once,
                description: description,
            });
        }
    }

    do(name, result = {}) {
        if (typeof this.listEvents[name] !== "undefined") {
            this.listEvents[name].forEach(function (event) {
                event.callback(result);
            });

            this.deleteOnce(name);
        }
    }

    delete(name, event_id) {
        if (name && event_id) {
            this.listEvents[name] = this.listEvents[name].filter(item => item.id !== event_id);
            this.deleteEmptyEvents(name);
        }
    }

    deleteOnce(name) {
       this.listEvents[name] = this.listEvents[name].filter(item => !item.once);
       this.deleteEmptyEvents(name);
    }

    deleteEmptyEvents(name) {
        if (!this.listEvents[name].length) {
            delete this.listEvents[name];
        }
    }

    getList() {
        let arrEvents = [];
        for (name in this.listEvents) {
            this.listEvents[name].forEach(function (event) {
                arrEvents.push({
                    name: name,
                    id: event.id,
                    description: event.description,
                    once: event.once,
                });
            });
        }

        return arrEvents;
    }

    getListByName(name) {
        let arrEvents = [];
        if (name) {
            if (typeof this.listEvents[name] !== "undefined") {
                this.listEvents[name].forEach(function (event) {
                    arrEvents.push({
                        name: name,
                        id: event.id,
                        description: event.description,
                        once: event.once,
                    });
                });
            }
        }

        return arrEvents;
    }
}