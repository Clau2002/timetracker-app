using AutoMapper;
using BackendAPI.DTO;
using BackendAPI.Models;

namespace BackendAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserDTO>();
            CreateMap<Project, ProjectDTO>();
            CreateMap<Stage, StageDTO>();
            CreateMap<TimeEntry, TimeEntryDTO>();
        }
    }
}
