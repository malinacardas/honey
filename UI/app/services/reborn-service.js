import Service from '@ember/service';
import $ from 'jquery';
import ENV from 'ui/config/environment';


export default Service.extend({

    getResults(id) {
        return $.ajax({
            type: 'GET',
            url: ENV.APP.host + ":" + ENV.APP.port + "/results/" + id,
            dataType: "json",
            headers: { "Content-Type": "application.json" }
        })
    },
    getParticipants(idEvent) {
        return $.ajax({
            type: 'GET',
            url: ENV.APP.host + ":" + ENV.APP.port + "/events/" + idEvent + "/participants",
            dataType: "json",
            headers: { "Content-Type": "application/json" }
        })
    },
    // getPasswords(idUser){
    //     return $.ajax({
    //         type: 'GET',
    //         url:ENV.APP.host + ":" + ENV.APP.port + "/user/" + idUser + "/passwords",
    //         headers: { "Content-Type": "application/json" }
    //     })
    // },

    // getIdFromUser(username){
    //     return $.ajax({
    //         type:'GET',
    //         url:ENV.APP.host + ":" + ENV.APP.port + "/user/" + username + "/passwords",
    //         headers: { "Content-Type": "application/json" }
    //     })
    // },

    getPasswords(username){
        return $.ajax({
            type: 'GET',
            url:ENV.APP.host + ":" + ENV.APP.port + "/user/" + username + "/passwords",
            headers: { "Content-Type": "application/json" }
        })
    },

    postResult(maxSpeed, avgSpeed, playerResult, raceType, raceValue, idParticipant) {
        return $.ajax({
            type: 'POST',
            dataType: 'json',
            headers: { "Content-Type": "application/json" },
            url: ENV.APP.host + ":" + ENV.APP.port + "/results",
            data: JSON.stringify({ "playerResult": playerResult, "maxSpeed": maxSpeed, "avgSpeed": avgSpeed, "raceType": raceType, "raceValue": raceValue, "idParticipant": idParticipant })
        })
    },
    putPassword(id,account,username,password){
        return $.ajax({
            type:'PUT',
            dataType:'json',
            headers:{"Content-Type":"application/json"},
            url: ENV.APP.host + ":" + ENV.APP.port + "/user/"+id +"/edit",
            data: JSON.stringify({ "account": account, "username": username, "password": password }),
            statusCode: {
                500: this.handleInternalServerErrorCallback
            }
        })
    },

    putSettings(bikes, roller, racetype, value) {
        return $.ajax({
            type: 'PUT',
            dataType: 'json',
            headers: { "Content-Type": "application/json" },
            url: ENV.APP.host + ":" + ENV.APP.port + "/settings",
            data: JSON.stringify({ "noOfBikes": bikes, "rollerDiameter": roller, "lapSize": 250, "raceType": racetype, "raceValue": value })
        })
    },

    getSettings() {
        return $.ajax({
            type: 'GET',
            dataType: 'json',
            headers: { "Content-Type": "application/json" },
            url: ENV.APP.host + ":" + ENV.APP.port + "/settings",
        })
    },

    putSettingsNoRoller(bikes, racetype, racevalue) {
        return $.ajax({
            type: 'PUT',
            dataType: 'json',
            headers: { "Content-Type": "application/json" },
            url: ENV.APP.host + ":" + ENV.APP.port + "/settings",
            data: JSON.stringify({ "noOfBikes": bikes, "raceType": racetype, "raceValue": racevalue })
        })
    },

    setStatus(id) {
        return $.ajax({
            type: 'PUT',
            dataType: 'json',
            headers: { "Content-Type": "application/json" },
            url: ENV.APP.host + ":" + ENV.APP.port + "/events/editStatus/" + id
        })
    },

    deletePassword(id) {
        return $.ajax({
            type: 'DELETE',
            url: ENV.APP.host + ":" + ENV.APP.port + "/user/" + id,
            dataType: 'json',
            headers: { "Content-Type": "application/json" },
            statusCode: {
                500: this.handleInternalServerErrorCallback
            }
        })
    },


    fileUpload(file) {
        return file.upload(ENV.APP.host + ":" + ENV.APP.port + '/events/upload')
    },

    fileDownload(file) {
        return ENV.APP.host + ":" + ENV.APP.port + "/events/download/" + file
    },

    getEvent() {
        return $.ajax({
            type: 'GET',
            url: ENV.APP.host + ":" + ENV.APP.port + "/registrations/openEvent",
            dataType: 'json',
            headers: { "Content-Type": "application/json" },
        })
    },

    getPassword(id) {
        return $.ajax({
            type: 'GET',
            url: ENV.APP.host + ":" + ENV.APP.port + "/user/" + id +"/edit",
            dataType: 'json',
            headers: { "Content-Type": "application/json" },
        })
    },

    // getPassword(id) {
    //     return $.ajax({
    //         type: 'GET',
    //         url: ENV.APP.host + ":" + ENV.APP.port + "/user/" + id +"/edit",
    //         dataType: 'json',
    //         headers: { "Content-Type": "application/json" },
    //     })
    // },


    getEvents() {
        return $.ajax({
            type: 'GET',
            url: ENV.APP.host + ":" + ENV.APP.port + "/events",
            dataType: 'json',
            headers: { "Content-Type": "application/json" },
        })
    },

    getEventById(id) {
        return $.ajax({
            type: 'GET',
            url: ENV.APP.host + ":" + ENV.APP.port + "/events/" + id,
            dataType: 'json',
            headers: { "Content-Type": "application/json" },
        })
    },

    postEvent(name, image, raceType, nrOfBikes, raceValue) {
        return $.ajax({
            type: 'POST',
            dataType: 'json',
            headers: { "Content-Type": "application/json" },
            url: ENV.APP.host + ":" + ENV.APP.port + "/events",
            data: JSON.stringify({ "name": name, "image": image, "raceType": raceType, "nrOfBikes": nrOfBikes, "raceValue": raceValue })
        })
    },

    postPassword(idUser,account,username,password){
        return $.ajax({
            type: 'POST',
            datatype: 'json',
            headers:{"Content-Type": "application/json"},
            url: ENV.APP.host + ":" + ENV.APP.port + "/user",
            data: JSON.stringify({"account": account, "username":username, "password":password, "idUser":idUser})
        })
    },

    postRegistration(username, email, password) {
        return $.ajax({
            type: 'POST',
            dataType: 'json',
            headers: { "Content-Type": "application/json" },
            url: ENV.APP.host + ":" + ENV.APP.port + "/registrations",
            data: JSON.stringify({ "name":username, "email": email, "password":password })
        })
    },

    getMaxSpeed() {
        return $.ajax({
            type: 'GET',
            url: ENV.APP.host + ":" + ENV.APP.port + "/race/getmaxspeed",
            dataType: 'json',
            headers: { "Content-Type": "application/json" },
        })
    },

    verifyOpenEvent(idEvent) {
        return $.ajax({
            type: 'GET',
            url: ENV.APP.host + ":" + ENV.APP.port + "/events/" + idEvent + "/openEvent",
            dataType: 'json',
            headers: { "Content-Type": "application/json" },
        })
    }
});