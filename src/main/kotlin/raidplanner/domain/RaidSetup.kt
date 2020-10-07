package raidplanner.domain

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import java.util.*
import javax.persistence.*

val mapper = jacksonObjectMapper()

@Entity
class RaidSetup(@Id var id: String? = null, @Basic(optional = false, fetch = FetchType.EAGER) @Lob val json: String)

fun raidSetupFromDomain(id: String?, raidGroups: RaidLayout, debuffList: DebuffList) : RaidSetup =
        RaidSetup(id ?: UUID.randomUUID().toString(), mapper.writeValueAsString(raidGroups))

class DebuffList(val debuffs: List<Debuff>) {
    init {
        require(debuffs.size <= 16) { "Max number of debuff slots is 16 in WoW classic." }
    }
}

class RaidGroup(val members: List<ClassSpec>) {
    init {
        require(members.size < 6) {"Group size needs to be 0-5."}
    }
}

class RaidLayout(val groups: Map<Int, RaidGroup>) {
    init {
        require(groups.size == 8 || groups.size == 2 || groups.size == 4)
        {"Input map of groups need to be a valid raid size (10, 20, 40)."}
    }
}
