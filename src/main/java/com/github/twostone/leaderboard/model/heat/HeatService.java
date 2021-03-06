package com.github.twostone.leaderboard.model.heat;

import javax.inject.Inject;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(
    path = "api/competitions/{id}/events/{eventId}/heats",
    consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE)
public class HeatService {

  private final HeatManager heatManager;

  @Inject
  public HeatService(final HeatManager heatManager) {
    super();
    this.heatManager = heatManager;
  }


  @GetMapping
  public HeatPlan getHeatPlanForEvent(@PathVariable("eventId") final long eventId) {
    return this.heatManager.getHeatPlan(eventId);
  }

  @PostMapping
  public HeatPlan saveHeatPlan(@RequestBody final HeatPlan plan) {
    return this.heatManager.save(plan);
  }
  
  @PostMapping("byRank")
  public HeatPlan fillByRanking(@PathVariable("id") long competitionId, @RequestBody final HeatPlan plan) {
    return this.heatManager.fillByRanking(competitionId, plan);
  }
  
  @PostMapping("copy")
  public HeatPlan copyFromPrevious(@PathVariable("id") long competitionId, @RequestBody final HeatPlan plan) {
    return this.heatManager.copyFromPrevious(competitionId, plan);
  }
  
  @PostMapping("merge")
  public HeatPlan merge(@RequestBody HeatPlan plan, @RequestParam(value = "mergeDivisions", defaultValue = "false") boolean mergeDivisions) {
    return this.heatManager.mergeHeats(plan, mergeDivisions);
  }

}
