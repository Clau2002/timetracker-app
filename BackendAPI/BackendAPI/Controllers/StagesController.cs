using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendAPI.Models;
using BackendAPI.Data;
using Microsoft.AspNetCore.Authorization;
using BackendAPI.Interfaces;

namespace BackendAPI.Controllers
{
    [Authorize]
    public class StagesController : BaseControllerApi
    {
        private readonly IStageRepository _stageRepository;

        public StagesController(IStageRepository stageRepository)
        {
            _stageRepository = stageRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Stage>> GetAllStages()
        {
            return await _stageRepository.GetStagesAsync();
        }

        [HttpGet("id/{id}")]
        public async Task<Stage> GetStageById(int id)
        {
            return await _stageRepository.GetStageByIdAsync(id);
        }

        [HttpGet("name/{name}")]
        public async Task<Stage> GetStageByName(string name)
        {
            return await _stageRepository.GetStageByNameAsync(name);
        }

        [HttpPost("createStage")]
        public async Task<Stage> CreateStage(Stage stage)
        {
            return await _stageRepository.CreateStageAsync(stage);
        }

        [HttpPut("update")]
        public async Task UpdateStage(Stage stage)
        {
            await _stageRepository.UpdateStageAsync(stage);
        }

        [HttpGet("getStageTime/{id}")]
        public async Task<TimeSpan> GetStageTotalTime(int id)
        {
            return await _stageRepository.GetStageTotalTimeSpentAsync(id);
        }
    }
}
