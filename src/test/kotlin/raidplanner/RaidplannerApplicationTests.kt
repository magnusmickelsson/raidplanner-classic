package raidplanner

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.transaction.annotation.Transactional
import raidplanner.domain.RaidSetup
import raidplanner.domain.RaidStateRepository
import java.util.*

@SpringBootTest
@Transactional
class RaidplannerApplicationTests(@Autowired val repository: RaidStateRepository) {

	@Test
	fun contextLoads() {
	}

	@Test
	fun saveAndLoad() {
		// Given
		assertTrue(repository.findAll().toList().isEmpty())
		val id = UUID.randomUUID().toString()

		// When/Then
		val entity = repository.save(RaidSetup(id, "Some json"))
		val loadedEntity = repository.findById(id).get()
		assertEquals(entity, loadedEntity)
	}
}
