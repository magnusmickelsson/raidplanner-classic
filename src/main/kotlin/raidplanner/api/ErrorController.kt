package raidplanner.api

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class ErrorController {
    @GetMapping("/error")
    fun error() = "{An error occurred. Check logs.}"
}
