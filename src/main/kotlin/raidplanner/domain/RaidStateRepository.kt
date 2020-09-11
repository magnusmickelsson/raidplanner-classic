package raidplanner.domain

import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

@Repository
@Transactional
interface RaidStateRepository : PagingAndSortingRepository<RaidSetup, String>
