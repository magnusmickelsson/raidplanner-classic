package raidplanner.domain

import org.springframework.stereotype.Repository

// TODO: Refactor debuff setup into its own repository?
// TODO: Debuff handling needs to be aware that some debuffs take extra spot and some add to the same one
@Repository
class DomainRepository {
    private val items: List<DebuffItem>
    private val specs: List<ClassSpec>
    // TODO: Logic:
    /**
     * Annihilator for melee heavy raids
     * Nightfall more important for caster heavy raids
     * Arcanite dragonling if many fire mages and engineer in raid
     * Judgment of light/wisdom if alliance
     */
    private val debuffPriorityTemplate: List<Debuff> = thunderfury.effect.plus(listOf(
            sunderArmor,
            cor,
            annihilator.effect.first(),
            faerieFire,
            coe,
            improvedScorch,
            ignite,
            cos,
            impShadowbolt,
            shadowWeaving,
            swp,
            nightfall.effect.first(),
            hunterMark,
            Debuff("Buffer for effects like taunt")
    ))

    companion object {
        // TODO: Refactor into item repository?
        val arcaniteDragonling = DebuffItem("Arcanite Dragonling", listOf(
                Debuff("Arcanite Dragonling Flame Buffet", DebuffEffectType(emptyList(), listOf(
                        DamageModifier(DamageType.FIRE, DamageIncrease(40.0, Unit.NUMBER), stackTimes = 3) // TODO: Verify the actual number at level 60
                )))
        ))

        val annihilator = DebuffItem("Annihilator", listOf(
                Debuff("Annihilator Armor reduction", DebuffEffectType(
                        listOf(
                                StatModifier(StatType.ARMOR, -200, stackTimes = 3)
                        ),
                        emptyList()
                ))
        ))

        val nightfall = DebuffItem("Nightfall", listOf(
                Debuff("Nightfall", DebuffEffectType(
                        emptyList(),
                        increaseAllSpellDamageBy(DamageIncrease(15.0, Unit.PERCENT))
                ))
        ))

        val giftOfArthas = DebuffItem("Gift of Arthas", listOf(
                Debuff("Gift of Arthas", DebuffEffectType(emptyList(), listOf(
                        DamageModifier(DamageType.PHYSICAL, DamageIncrease(8.0, Unit.NUMBER))
                )))
        ))

        val thunderfury = DebuffItem("Thunderfury ", listOf(
                Debuff("Thunderfury slow", DebuffEffectType(
                        listOf(
                                StatModifier(StatType.ATTACK_SPEED, -20)
                        )
                )),
                Debuff("Thunderfury Nature Resistance", DebuffEffectType(
                        listOf(
                                StatModifier(StatType.NATURE_RESIST, -26)
                        )
                ))

        ))

        val hunterMark = Debuff("Hunter's Mark", DebuffEffectType(
                damageModifiers = listOf(
                        DamageModifier(DamageType.RANGED, DamageIncrease(110.0, Unit.NUMBER))
                )
        ), overwrites = true)

        val faerieFire = Debuff("Faerie Fire", DebuffEffectType(statModifiers = listOf(
                StatModifier(StatType.ARMOR, -505)
        )))
    }

    init {
        items = listOf(
                annihilator,
                nightfall,
                arcaniteDragonling,
                giftOfArthas,
                thunderfury
        )

        specs = listOf(
                ClassSpec("SM/Ruin", WowClassName.WARLOCK, warlockDebuffs()),
                ClassSpec("MD/Ruin", WowClassName.WARLOCK, warlockDebuffs()),
                ClassSpec("DS/Ruin", WowClassName.WARLOCK, warlockDebuffs()),
                ClassSpec("Mortal Strike Arms", WowClassName.WARRIOR, listOf(
                        Debuff("Mortal Strike", DebuffEffectType()) // TODO: How setup healing reduction effect?
                ).plus(warriorDebuffs())
                ),
                ClassSpec("DPS", WowClassName.WARRIOR, warriorDebuffs()),
                ClassSpec("Tank", WowClassName.WARRIOR, warriorDebuffs()),
                ClassSpec("Disc Shadow Weaving", WowClassName.PRIEST, shadowPriestDebuffs()),
                ClassSpec("Shadow", WowClassName.PRIEST, shadowPriestDebuffs()),
                ClassSpec("Holy", WowClassName.PRIEST, emptyList()),
                ClassSpec("Disc", WowClassName.PRIEST, emptyList()),
                ClassSpec("Elemental", WowClassName.SHAMAN, emptyList()),
                ClassSpec("Resto", WowClassName.SHAMAN, emptyList()),
                ClassSpec("Enhance", WowClassName.SHAMAN, listOf(
                        Debuff("Stormstrike", DebuffEffectType(
                                damageModifiers = listOf(
                                        DamageModifier(DamageType.NATURE, DamageIncrease(20.0, Unit.PERCENT))
                                )
                        ), overwrites = false)
                )),
                ClassSpec("Hunter", WowClassName.HUNTER, listOf(
                        hunterMark,
                        Debuff("Screech (pet)", DebuffEffectType(statModifiers = listOf(
                                StatModifier(StatType.ATTACK_POWER, -100)
                        )
                        ), overwrites = true),
                        Debuff("Expose Weakness (T2)", DebuffEffectType(damageModifiers = listOf(
                                DamageModifier(DamageType.RANGED, DamageIncrease(450.0, Unit.NUMBER))
                        )))
                )),
                ClassSpec("Feral DPS", WowClassName.DRUID, listOf(
                        faerieFire
                )),
                ClassSpec("Feral Tank", WowClassName.DRUID, listOf(
                        faerieFire
                )),
                ClassSpec("Resto", WowClassName.DRUID, listOf(
                        faerieFire,
                        Debuff("Insect Swarm", DebuffEffectType(statModifiers = listOf(
                                StatModifier(StatType.HIT, -2)
                        )))
                )),
                ClassSpec("Moonkin", WowClassName.DRUID, listOf(
                        faerieFire,
                        Debuff("Insect Swarm", DebuffEffectType(statModifiers = listOf(
                                StatModifier(StatType.HIT, -2)
                        )))
                )),
                ClassSpec("Fire", WowClassName.MAGE, listOf(
                        improvedScorch, ignite
                )),
                ClassSpec("Winter's Chill Frost", WowClassName.MAGE, listOf(wintersChill)),
                ClassSpec("Frost", WowClassName.MAGE, emptyList()),
                ClassSpec("Arcane", WowClassName.MAGE, emptyList()),
                ClassSpec("Holy", WowClassName.PALADIN, listOf(
                        Debuff("Seal of Wisdom", DebuffEffectType()),
                        Debuff("Seal of Light", DebuffEffectType())
                )),
                ClassSpec("Retribution", WowClassName.PALADIN, listOf(
                        Debuff("Seal of Wisdom", DebuffEffectType()),
                        Debuff("Seal of Light", DebuffEffectType()
                        )
                )),
                ClassSpec("Tank", WowClassName.PALADIN, listOf(
                        Debuff("Seal of Wisdom", DebuffEffectType()),
                        Debuff("Seal of Light", DebuffEffectType()
                        )
                )
                ),
                ClassSpec("DPS Hemorrhage", WowClassName.ROGUE, rogueDebuffs().plus(
                        Debuff("Hemorrhage", DebuffEffectType(damageModifiers = listOf(
                                DamageModifier(DamageType.PHYSICAL, DamageIncrease(7.0, Unit.NUMBER))
                        )))
                )),
                ClassSpec("DPS", WowClassName.ROGUE, rogueDebuffs())
        )
    }

    fun getSpecs() = specs
    fun getDebuffPriorityTemplateAQ40() = debuffPriorityTemplate
    fun getDebuffItems() = items
}

fun increaseAllSpellDamageBy(damageIncrease: DamageIncrease): List<DamageModifier> = increaseDamageBy(damageIncrease,
        listOf(
                DamageType.ARCANE, DamageType.FIRE, DamageType.FROST, DamageType.SHADOW, DamageType.HOLY, DamageType.NATURE
        )
)

fun increaseDamageBy(damageIncrease: DamageIncrease, types: List<DamageType>, stacksTo: Int = 1) = types.map { DamageModifier(it, damageIncrease, stacksTo) }

val sunderArmor = Debuff("Sunder Armor", DebuffEffectType(
        statModifiers = listOf(
                StatModifier(StatType.ARMOR, -450, stackTimes = 5)
        )
))

val demoShout = Debuff("Demoralizing Shout", DebuffEffectType(
        statModifiers = listOf(
                StatModifier(StatType.ATTACK_POWER, -134)
        )
))

val wintersChill = Debuff("Winter's Chill", DebuffEffectType(statModifiers = listOf(
        StatModifier(StatType.SPELL_CRIT, 2, 5)
)))

val improvedScorch = Debuff("Improved Scorch", DebuffEffectType(damageModifiers = listOf(
        DamageModifier(DamageType.FIRE, DamageIncrease(3.0, Unit.PERCENT), stackTimes = 5)
)))

val ignite = dot("Ignite (Firemage dot)")

fun warriorDebuffs(): List<Debuff> = listOf(
        sunderArmor,
        demoShout,
        dot("Deep Wounds"),
        Debuff("Thunderclap", DebuffEffectType(statModifiers = listOf(
                StatModifier(StatType.ATTACK_SPEED, -10)
        )))
)

val shadowWeaving = Debuff("Shadow Weaving", DebuffEffectType(
        damageModifiers = increaseDamageBy(DamageIncrease(3.0, Unit.PERCENT), listOf(
                DamageType.SHADOW
        ), stacksTo = 5
        )
))

val mindFlay = dot("Mind Flay")

val swp = dot("Shadow Word: Pain")

fun shadowPriestDebuffs(): List<Debuff> = listOf(
        shadowWeaving,
        mindFlay,
        swp)

val cos = Debuff("Curse of Shadows", DebuffEffectType(
        statModifiers = vulnerability(75, listOf(StatType.ARCANE_RESIST, StatType.SHADOW_RESIST)),
        damageModifiers = increaseDamageBy(DamageIncrease(10.0, Unit.PERCENT), listOf(
                DamageType.SHADOW, DamageType.ARCANE
        )
        )
)
)

val coe = Debuff("Curse of Elements", DebuffEffectType(
        statModifiers = vulnerability(75, listOf(StatType.FIRE_RESIST, StatType.FROST_RESIST)),
        damageModifiers = increaseDamageBy(DamageIncrease(10.0, Unit.PERCENT), listOf(
                DamageType.FIRE, DamageType.FROST
        )
        )
)
)

val cor = Debuff("Curse of Recklessness", DebuffEffectType(
        statModifiers = listOf(
                StatModifier(StatType.ARMOR, -640)
        )
)
)

val impShadowbolt = Debuff("Improved Shadowbolt", DebuffEffectType(damageModifiers = listOf(
        DamageModifier(DamageType.SHADOW, DamageIncrease(20.0, Unit.PERCENT))
)))

fun warlockDebuffs(): List<Debuff> = listOf(
        cos,
        coe,
        cor,
        Debuff("Curse of Weakness", DebuffEffectType(
                statModifiers = listOf(
                        StatModifier(StatType.PHYSICAL_DAMAGE, -31) // TODO: Check value
                )
        )
        ),
        Debuff("Curse of Tongues", DebuffEffectType(
                statModifiers = listOf(
                        StatModifier(StatType.CAST_TIME, -50) // TODO: change to unit based modifier here too?
                )
        )
        ),
        dot("Corruption"),
        dot("Immolate"),
        dot("Curse of Doom"),
        dot("Curse of Agony"),
        impShadowbolt
)

fun vulnerability(spellResistanceReduction: Int, statTypes: List<StatType>): List<StatModifier> = statTypes.map { StatModifier(it, -spellResistanceReduction) }

fun rogueDebuffs(): List<Debuff> {
    return listOf(
            Debuff("Expose Armor", DebuffEffectType(statModifiers = listOf(
                    StatModifier(StatType.ARMOR, -1700, 1)
            )))
    )
}
