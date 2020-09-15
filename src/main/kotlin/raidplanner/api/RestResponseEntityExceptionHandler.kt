package raidplanner.api

import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@ControllerAdvice
class RestResponseEntityExceptionHandler : ResponseEntityExceptionHandler() {
    @ExceptionHandler(value = [IllegalArgumentException::class])
    fun handle400(ex: RuntimeException?, request: WebRequest?): ResponseEntity<Any> =
            handleExceptionInternal(ex!!,
                    "Bad request: ${ex.message}", HttpHeaders(), HttpStatus.BAD_REQUEST, request!!)

    @ExceptionHandler(value = [IllegalStateException::class])
    fun handle500(ex: RuntimeException?, request: WebRequest?): ResponseEntity<Any> =
            handleExceptionInternal(ex!!,
                    "Server error: ${ex.message}", HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request!!)
}
