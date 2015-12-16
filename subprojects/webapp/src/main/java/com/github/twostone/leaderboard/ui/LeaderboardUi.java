package com.github.twostone.leaderboard.ui;

import com.github.twostone.leaderboard.ui.view.CompetitionsView;

import com.vaadin.annotations.Theme;
import com.vaadin.navigator.Navigator;
import com.vaadin.server.VaadinRequest;
import com.vaadin.spring.annotation.SpringUI;
import com.vaadin.spring.navigator.SpringViewProvider;
import com.vaadin.ui.Panel;
import com.vaadin.ui.UI;
import org.springframework.beans.factory.annotation.Autowired;

@SuppressWarnings("serial")
@SpringUI
@Theme("valo")
public class LeaderboardUi extends UI {

  @Autowired
  private SpringViewProvider viewProvider;

  @Override
  protected void init(VaadinRequest request) {
    Panel panel = new Panel();
    panel.setSizeFull();
    this.setContent(panel);

    Navigator navigator = new Navigator(this, panel);
    navigator.addProvider(this.viewProvider);
    navigator.navigateTo(CompetitionsView.VIEW_NAME);
  }
}
