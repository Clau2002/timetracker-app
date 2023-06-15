using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendAPI.Models;
using BackendAPI.Data;
using BackendAPI.Repositories;
using BackendAPI.Interfaces;

namespace BackendAPI.Controllers
{
    public class TimeEntriesController : BaseControllerApi
    {
        //private readonly DataContext _context;
        private readonly ITimeEntryRepository _timeEntryRepository;

        public TimeEntriesController(ITimeEntryRepository timeEntryRepository)
        {
            _timeEntryRepository = timeEntryRepository;
        }

        [HttpGet]
        public async Task<ICollection<TimeEntry>> GetAllTimeEntries()
        {
            return await _timeEntryRepository.GetAllTimeEntriesAsync();
        }

        [HttpGet("{id}")]
        public async Task<TimeEntry> GetTimeEntryById(int id)
        {
            return await _timeEntryRepository.GetTimeEntryByIdAsync(id);
        }

        [HttpGet("stageId/{stageId}")]
        public async Task<ICollection<TimeEntry>> GetTimeEntriesByStageId(int stageId)
        {
            return await _timeEntryRepository.GetAllTimeEntriesByStageIdAsync(stageId);
        }

        [HttpPut("update")]
        public async Task UpdateTimeEntry(TimeEntry timeEntry)
        {
            await _timeEntryRepository.UpdateTimeEntryAsync(timeEntry);
        }

        [HttpPost("create")]
        public async Task<TimeEntry> CreateTimeEntry(TimeEntry timeEntry)
        {
            return await _timeEntryRepository.CreateTimeEntryAsync(timeEntry);
        }
    }
}
