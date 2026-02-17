package com.example

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.*

fun Application.configureDatabases() {
    val database = Database.connect(
        url = "jdbc:sqlite:/app/data/coffee-journal.db",
        driver = "org.sqlite.JDBC"
    )

    val coffeeService = Coffee_Services(database)
    val brewMethodService = BrewMethodsServices(database)
    val statisticsService = StatisticsServices(database)


    routing {

        //---------------------------------
        // COFFEE API ROUTING
        //---------------------------------

        // Create user
        post("/coffees") {
            val coffee = call.receive<coffee>()
            val id = coffeeService.insertCoffeeEntries(coffee)
            call.respond(HttpStatusCode.Created, mapOf("id" to id))
        }

        //Get all coffees

        get("/coffees") {
            val coffees = coffeeService.getAllCoffee()
            call.respond(HttpStatusCode.OK, coffees)
        }

        // Get a specific coffee by ID
        get("/coffees/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val coffee = coffeeService.getCoffee(id)
            if (coffee != null) {
                call.respond(HttpStatusCode.OK, coffee)
            } else {
                call.respond(HttpStatusCode.NotFound, mapOf("error" to "coffee not found"))
            }
        }

        // Update user
        put("/users/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val coffee = call.receive<coffee>()
            val updatedCoffee = coffee.copy(id=id)
            coffeeService.updateCoffee(updatedCoffee)
            call.respond(HttpStatusCode.OK)
        }

        // Delete user
        delete("/users/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            coffeeService.deleteCoffee( id)
            call.respond(HttpStatusCode.OK, mapOf("message" to "Coffee deleted"))
        }

        //--------------------------------
        //BREW METHOD API ROUTING
        //--------------------------------

        // Create brew methods/sessions
        post("/brew-methods") {
            val brewMethoding = call.receive<BrewMethod>()
            val id = brewMethodService.insertBrewMethod(brewMethoding)
            call.respond(HttpStatusCode.Created, mapOf("id" to id))
        }

        //Get all brew methods

        get("/brew-methods") {
            val brewMethod = brewMethodService.getAllBrewMethods()
            call.respond(HttpStatusCode.OK, brewMethod)
        }

        //Get the recent brew methods( recent 5 by default)

        get("/brew-methods/recent") {
            val brewMethod = brewMethodService.getAllBrewMethods()
            call.respond(HttpStatusCode.OK, brewMethod)
        }

        // Get a brew method for a specific coffee
        get("/coffees/{coffeeId}/brew-methods") {
            val coffeeId = call.parameters["coffeeId"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val brewMethods = brewMethodService.getBrewMethodsForCoffee(coffeeId)
            call.respond(HttpStatusCode.OK, brewMethods)
            }


        //Get a specific brew method by ID

        get("/brew-methods/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val brewMethod = brewMethodService.getBrewMethod(id)
            if (brewMethod != null) {
                call.respond(HttpStatusCode.OK, brewMethod)
            } else {
                call.respond(HttpStatusCode.NotFound, mapOf("error" to "Brew method not found"))
            }
        }


        // Update brew methods
        put("/brew-methods/{id}") {
            val id = call.parameters["id"]?.toInt() ?: IllegalArgumentException("Invalid ID")
            val brewMethod = call.receive<BrewMethod>()
            val updatedBrewMethod = brewMethod.copy(id= id as Int?)
            brewMethodService.ModifyBrewMethod(updatedBrewMethod)
            call.respond(HttpStatusCode.OK, mapOf("message" to "Brew method updated"))
        }

        // Delete brew methods
        delete("/brew-methods/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            brewMethodService.deleteBrewMethod( id)
            call.respond(HttpStatusCode.OK, mapOf("message" to " Brew method deleted"))
        }


        //------------------------
        //STATISTICS API ROUTING
        //----------------------

        //get statistics

        get("/statistics") {
            val statistics = statisticsService.getStatistics()
            call.respond(HttpStatusCode.OK, statistics)
        }

    }
}
