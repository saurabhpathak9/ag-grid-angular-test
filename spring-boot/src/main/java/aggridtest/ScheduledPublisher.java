package aggridtest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@EnableScheduling
@Component
public class ScheduledPublisher {

	@Autowired
	private SimpMessagingTemplate template;
	
	@Scheduled(fixedRate = 250)
	public void greeting() {
		GridData data = GridDataUtil.getSampleData();
		this.template.convertAndSend("/grid-data", data);
	}

}
