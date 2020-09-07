package raidplanner.api

import org.springframework.web.bind.annotation.*
import raidplanner.domain.ClassSpec
import raidplanner.domain.Debuff
import raidplanner.domain.DomainRepository
import raidplanner.domain.WowClassName

@CrossOrigin
@RestController
@RequestMapping("/api/")
class ApiController(private val repository: DomainRepository) {
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

    private fun filterByFaction(faction: Faction, specs: List<ClassSpec>): List<ClassSpec> = when (faction) {
        Faction.alliance -> specs.filter { it.className != WowClassName.SHAMAN }
        Faction.horde -> specs.filter { it.className != WowClassName.PALADIN }
    }
}

enum class Faction {
    horde, alliance
}
