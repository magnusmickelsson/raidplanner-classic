package raidplanner.domain

data class ClassSpec(val specName: String, val className: WowClassName, val canApplyDebuff: List<Debuff>)

data class DebuffItem(val name: String, val effect: List<Debuff>)

fun dot(name: String) = Debuff(name, DebuffEffectType(), overwrites = false)

data class Debuff(val name: String, val effectType: DebuffEffectType, val overwrites: Boolean = true)

// TODO: Add a field to keep track of the damage something does, like SWP or Corruption or Deep Wounds
data class DebuffEffectType(val statModifiers: List<StatModifier> = emptyList(), val damageModifiers: List<DamageModifier> = emptyList())

data class StatModifier(val modifierType: StatType, val modifierValue: Int, val stackTimes: Int = 1) // Increases physical damage taken by X or reduces shadow resistance by X

data class DamageModifier(val damageType: DamageType, val damageIncrease: DamageIncrease, val stackTimes: Int = 1)

data class DamageIncrease(val increase: Double, val unit: Unit)

enum class Unit {
    PERCENT, NUMBER
}

enum class StatType {
    STRENGTH, ATTACK_POWER, STAMINA, // todo: add more
    ARMOR, SHADOW_RESIST, FIRE_RESIST, FROST_RESIST, ARCANE_RESIST, NATURE_RESIST,
    CAST_TIME,
    PHYSICAL_DAMAGE,
    ATTACK_SPEED,
    HIT,
    SPELL_CRIT, MELEE_CRIT
}

enum class DamageType {
    PHYSICAL, SHADOW, FIRE, FROST, ARCANE, NATURE, HOLY, RANGED
}

enum class WowClassName {
    PRIEST, WARLOCK, MAGE, WARRIOR, ROUGE, PALADIN, SHAMAN, DRUID, HUNTER
}
