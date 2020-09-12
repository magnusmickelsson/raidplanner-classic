package raidplanner.api

import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler
import raidplanner.domain.*
import java.util.*


@CrossOrigin
@RestController
@RequestMapping("/api/")
class ApiController(private val repository: DomainRepository, private val raidStateRepository: RaidStateRepository) {
    @GetMapping("item")
    fun getItems() = repository.getDebuffItems()

    @GetMapping("faction/{faction}/spec")
    fun getClassSpecsForFaction(@PathVariable("faction") faction: Faction): List<ClassSpec> =
            filterByFaction(faction, repository.getSpecs())

    @GetMapping("faction/{faction}/specByClass")
    fun getClassSpecsByClassForFaction(@PathVariable("faction") faction: Faction):
            Map<WowClassName, List<ClassSpec>> {
        val map = mutableMapOf<WowClassName, List<ClassSpec>>()
        filterByFaction(faction, repository.getSpecs()).associateTo(map, {
            Pair(it.className, (map[it.className] ?: emptyList()).plus(it))
        })
        return map.toMap()
    }

    @GetMapping("faction/{faction}/specByClass/class/{wowClass}")
    fun getClassSpecsByClassForFaction(@PathVariable("faction") faction: Faction,
                                       @PathVariable("wowClass") wowClassName: WowClassName): List<ClassSpec> =
            getClassSpecsByClassForFaction(faction)[wowClassName] ?: error("No results for $wowClassName")

    @GetMapping("spec")
    fun getClassSpecs() = repository.getSpecs()

    @GetMapping("faction/{faction}/debuff")
    fun getDebuffsForFaction(@PathVariable("faction") faction: Faction): List<Debuff> =
            filterByFaction(faction, repository.getSpecs()).flatMap { it.canApplyDebuff }.distinct()

    @GetMapping("debuff")
    fun getAllDebuffs(): List<Debuff> = repository.getSpecs().flatMap { it.canApplyDebuff }.distinct()

    @GetMapping("faction/{faction}/debuffTemplate/aq40") // Same for both factions at first
    fun getDebuffTemplate(@PathVariable("faction") faction: Faction) = repository.getDebuffPriorityTemplateAQ40()

    // TODO check number of failed gets for brute force access
    @GetMapping("raid/{id}")
    fun getRaidState(@PathVariable("id") id: String): String {
        val optional = raidStateRepository.findById(id)
        if (optional.isPresent) return optional.get().json else throw IllegalArgumentException("No such raid state!")
    }

    // TODO: Introduce service for transaction handling?
    @PostMapping("raid")
    @Transactional
    fun createRaidState(@RequestBody stateAsJson: String): String {
        // TODO: Validate json?
        val id = UUID.randomUUID().toString()
        val optional = raidStateRepository.findById(id)
        // This should never happen, but keep this as a safeguard
        require(!optional.isPresent) { "Could not create raid state due to conflicting UUID - try again!" }
        val saved = raidStateRepository.save(RaidSetup(id, stateAsJson))
        return saved.id ?: throw IllegalStateException("ID for entity is null, could not save state!")
    }

    @PutMapping("raid/{id}")
    @Transactional
    fun saveRaidState(@PathVariable("id") id: String, @RequestBody stateAsJson: String): String {
        val optional = raidStateRepository.findById(id)
        require(optional.isPresent) { "Could not save raid state since existing entity doesn't exist!" }
        val saved = raidStateRepository.save(RaidSetup(id, stateAsJson))
        return saved.json
    }

    private fun filterByFaction(faction: Faction, specs: List<ClassSpec>): List<ClassSpec> = when (faction) {
        Faction.alliance -> specs.filter { it.className != WowClassName.SHAMAN }
        Faction.horde -> specs.filter { it.className != WowClassName.PALADIN }
    }

}

enum class Faction {
    horde, alliance
}

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
