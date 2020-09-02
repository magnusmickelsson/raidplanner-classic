package raidplanner.api

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import raidplanner.domain.DomainRepository

@CrossOrigin
@RestController
@RequestMapping("/api/")
class ApiController(private val repository: DomainRepository) {
    @GetMapping("item")
    fun getItems() = repository.getDebuffItems()

    @GetMapping("spec")
    fun getClassSpecs() = repository.getSpecs()

    @GetMapping("debuff")
    fun getAllDebuffs() = repository.getSpecs().flatMap { it.canApplyDebuff }.distinct()

    @GetMapping("debuffTemplate/aq40")
    fun getDebuffTemplate() = repository.getDebuffPriorityTemplateAQ40()
}
