package com.example

import kotlinx.coroutines.Dispatchers
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction


//---------------------------------------------------
// INITIALISING DATABASE ENTITY
//-------------------------------------------


@Serializable
data class coffee(
    val id : Int? = null,
    val name : String,
    val origin : String? = null,
    val roaster : String? = null,
    val roastLevel : String?=null,
    val roastDate : String?= null,
    val purchasedate : String?= null,
    val price: Double? = null,
    val rating: Int? = null,
    val dateofpurchase: String? = null,
    val notes: String? = null
)

@Serializable
data class BrewMethod(
    val id : Int ? = null,
    val coffeeId : Int,
    val brewDate : String ? = null,
    val brewMethod: String? = null,
    val coffeeWeight : Double? = null,
    val waterWeight : Double? = null,
    val grindSize : String? = null,
    val rating : Int? = null,
    val notes : String ? = null
)

@Serializable

data class Statistics(
    val totalCoffees: Int,
    val totalSessions: Int,
    val averageRating: Double,
    val favouriteOrigin: String?,
    val favouriteBrewMethod: Int?
)

//------------------------------------
//CRUD OPERATIONS FOR COFFEE SERVICES
//-------------------------------------

class Coffee_Services(private val database: Database) {
    object Coffee_Entries: Table("Coffees") {

        val id = integer("id").autoIncrement()
        val name =varchar("name", 255)
        val origin = varchar("origin", 255)
        val roaster = varchar("roaster", 255).nullable()
        val roastLevel = varchar("roast_level", 100)
        val roastDate = text("roast_date").nullable()
        val purchaseDate = text("purchase_date").nullable()
        val price = double("price").nullable()
        val rating = integer("rating").nullable()
        val dateOfPurchase = text("date_of_purchase").nullable()
        val notes = text("notes").nullable()

        override val primaryKey = PrimaryKey(id)

    }

    init{
        transaction(database) {
            SchemaUtils.create(Coffee_Entries)
        }
    }

    //CREATE - Insert coffee entries

    suspend fun insertCoffeeEntries(coffeeEntries: coffee): Int = dbQuery {
        Coffee_Entries.insert {
            it[name] = coffeeEntries.name
            it[origin] = coffeeEntries.origin ?: ""
            it[roaster] = coffeeEntries.roaster
            it[roastLevel] = coffeeEntries.roastLevel ?: ""
            it[roastDate] = coffeeEntries.roastDate
            it[purchaseDate] = coffeeEntries.purchasedate
            it[price] = coffeeEntries.price
            it[rating] = coffeeEntries.rating
            it[dateOfPurchase] = coffeeEntries.dateofpurchase
            it[notes] = coffeeEntries.notes
        }[Coffee_Entries.id]
    }

    //GET ONE COFFEE BY ID

    suspend fun getCoffee(id: Int): coffee? = dbQuery {
        Coffee_Entries.selectAll()
            .where {Coffee_Entries.id eq id}
            .map {rowToCoffee(it)}
            .singleOrNull()
    }


    //GET ALL COFFEE by returning a list of all of it
    suspend fun getAllCoffee(): List<coffee> = dbQuery {
        Coffee_Entries.selectAll()
            .map { rowToCoffee(it) }
    }

    //UPDATE - modify coffee update
    suspend fun updateCoffee(coffee: coffee): Int = dbQuery {
        Coffee_Entries.update({ Coffee_Entries.id eq coffee.id!!}) {
            it[name] = coffee.name
            it[origin] = coffee.origin ?: ""
            it[roaster] = coffee.roaster
            it[roastLevel] = coffee.roastLevel ?: ""
            it[roastDate] = coffee.roastDate
            it[purchaseDate] = coffee.purchasedate
            it[price] = coffee.price
            it[rating] = coffee.rating
            it[dateOfPurchase] = coffee.dateofpurchase
            it[notes] = coffee.notes
        }
    }

    //DELETE - delete Coffee entry

    suspend fun deleteCoffee (id: Int): Int = dbQuery {
        BrewMethodsServices.BrewMethods.deleteWhere { BrewMethodsServices.BrewMethods.coffeeId eq id }
        Coffee_Entries.deleteWhere { Coffee_Entries.id eq id }
    }

    //HELPER: Convert database rows to coffee objects

    private fun rowToCoffee(row: ResultRow): coffee {
        return coffee(
        id = row[Coffee_Entries.id],
        name = row[Coffee_Entries.name],
        origin = row[Coffee_Entries.origin],
        roaster = row[Coffee_Entries.roaster],
        roastLevel = row[Coffee_Entries.roastLevel],
        roastDate = row[Coffee_Entries.purchaseDate],
        purchasedate = row[Coffee_Entries.purchaseDate],
        price = row[Coffee_Entries.price],
        rating = row[Coffee_Entries.rating],
        dateofpurchase = row[Coffee_Entries.dateOfPurchase],
        notes = row[Coffee_Entries.notes]
        )
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T = newSuspendedTransaction(Dispatchers.IO) {block()}

}

//------------------------------------
//BREW METHODS CRUD OPERATIONS
//------------------------------------


class BrewMethodsServices(private val database: Database) {
    object BrewMethods: Table("BrewMethods") {
        val id = integer("id").autoIncrement()
        val coffeeId = integer("coffee_id").references(Coffee_Services.Coffee_Entries.id)
        val brewDate = text("brew_date").nullable()
        val brewMethod = varchar("brew_method", 100).nullable()
        val coffeeWeight = double("coffee_weight").nullable()
        val waterWeight = double("water_weight").nullable()
        val grindSize = varchar("grind_size", 100).nullable()
        val rating = integer("rating").nullable()
        val notes = text("notes").nullable()

        override val primaryKey = PrimaryKey(id)
    }

    init {
        transaction(database) {
            SchemaUtils.create(BrewMethods)
        }
    }

    //CREATE - Insert brew method/session

    suspend fun insertBrewMethod(session: BrewMethod): Int = dbQuery {
        BrewMethods.insert {
            it[coffeeId] = session.coffeeId
            it[brewDate] = session.brewDate
            it[brewMethod] = session.brewMethod
            it[coffeeWeight] = session.coffeeWeight
            it[waterWeight] = session.waterWeight
            it[grindSize] = session.grindSize
            it[rating] = session.rating
            it[notes] = session.notes
        } [BrewMethods.id]
    }

    //READ ALL - Get all brew methods

    suspend fun getAllBrewMethods(): List<BrewMethod> = dbQuery {
        BrewMethods.selectAll()
            .map { rowToBrewMethod(it)}
    }

    //READ - get the recent brew methods (with limit)
    suspend fun getBrewMethods ( limit: Int = 5) : List <BrewMethod> = dbQuery {
        BrewMethods.selectAll()
            .orderBy(BrewMethods.brewDate to SortOrder.DESC)
            .limit(limit)
            .map {rowToBrewMethod(it)}
    }


    //READ - get brew methods associated with a specific coffee

    suspend fun getBrewMethodsForCoffee(coffeeId: Int): List <BrewMethod> = dbQuery {
        BrewMethods.selectAll()
            .where { BrewMethods.coffeeId eq coffeeId }
            .map { rowToBrewMethod(it)}
    }

    //READ ONE - Get specific brew method by ID

    suspend fun getBrewMethod(id: Int): BrewMethod? = dbQuery {
        BrewMethods.selectAll()
            .where { BrewMethods.id eq id }
            .map{ rowToBrewMethod(it)}
            .singleOrNull()
    }

    //UPDATE - update/modify a brew method

    suspend fun ModifyBrewMethod(session: BrewMethod): Int = dbQuery {
        BrewMethods.update({ BrewMethods.id eq session.coffeeId }) {
            it[coffeeId] = session.coffeeId
            it[brewDate] = session.brewDate
            it[brewMethod] = session.brewMethod
            it[coffeeWeight] = session.coffeeWeight
            it[waterWeight] = session.waterWeight
            it[grindSize] = session.grindSize
            it[rating] = session.rating
            it[notes] = session.notes
        }
    }

    //DELETE - Delete brew method

    suspend fun deleteBrewMethod (id: Int): Int = dbQuery {
        BrewMethods.deleteWhere { BrewMethods.id eq id }
    }

    //HELPER - convert the database row to brewMethod objects

    private fun rowToBrewMethod(row: ResultRow): BrewMethod = BrewMethod(
        id = row[BrewMethods.id],
        coffeeId = row[BrewMethods.coffeeId],
        brewDate = row[BrewMethods.brewDate],
        brewMethod = row[BrewMethods.brewMethod],
        coffeeWeight = row[BrewMethods.coffeeWeight],
        waterWeight = row[BrewMethods.waterWeight],
        grindSize = row[BrewMethods.grindSize],
        rating = row[BrewMethods.rating],
        notes = row[BrewMethods.notes]
    )

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

}


//------------------------------------------
//STATISTICS SERVICES OPERATION
//------------------------------------------

class StatisticsServices(private val database: Database) {
    init {

    }

    suspend fun getStatistics(): Statistics = dbQuery {
        val totalCoffees = Coffee_Services.Coffee_Entries.selectAll().count()
        val totalSessions = BrewMethodsServices.BrewMethods.selectAll().count()

        val averageRating = if (totalSessions > 0L) {
            BrewMethodsServices.BrewMethods
                .selectAll()
                .where { BrewMethodsServices.BrewMethods.rating.isNotNull() }
                .map { it[BrewMethodsServices.BrewMethods.rating]?.toDouble() ?: 0.0 }
                .average()

        } else { 0.0 }

        val favouriteOrigin = if (totalCoffees > 0) {
            Coffee_Services.Coffee_Entries
                .selectAll()
                .groupBy { it [Coffee_Services.Coffee_Entries.origin]}
                .maxByOrNull { it.value.size }
                ?.key

        } else { null }

        val favouriteBrewMethod = if (totalSessions > 0) {
            BrewMethodsServices.BrewMethods
                .selectAll()
                .groupBy {it [BrewMethodsServices.BrewMethods.rating ]}
                .maxByOrNull{ it.value.size }
                ?. key
        } else {null}

        Statistics (
            totalCoffees = totalCoffees.toInt(),
            totalSessions = totalSessions.toInt(),
            averageRating = averageRating,
            favouriteOrigin = favouriteOrigin,
            favouriteBrewMethod = favouriteBrewMethod
        )
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }
}


