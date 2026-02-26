package com.example

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import io.ktor.server.application.*
import java.util.*

object JwtConfig {
    private val secret = System.getenv("JWT_SECRET") ?: "dev-secret-key"
    private val algorithm = Algorithm.HMAC256(secret)
    private const val EXPIRATION_MS = 86400000L // 24 hours

    fun generateToken(userId: Int, username: String): String {
        return JWT.create()
            .withSubject(userId.toString())
            .withClaim("username", username)
            .withExpiresAt(Date(System.currentTimeMillis() + EXPIRATION_MS))
            .sign(algorithm)
    }

    fun verifyToken(token: String): Int? {
        return try {
            val decoded = JWT.require(algorithm).build().verify(token)
            decoded.subject.toInt()
        } catch (e: Exception) {
            null
        }
    }

    fun extractUserId(call: ApplicationCall): Int? {
        val authHeader = call.request.headers["Authorization"] ?: return null
        val token = authHeader.removePrefix("Bearer ")
        return verifyToken(token)
    }
}