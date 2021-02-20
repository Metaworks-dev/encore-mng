package encore.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;


@Controller
@RequestMapping("/")
public class IndexController {
	
    private Logger logger = LoggerFactory.getLogger(IndexController.class);
    
    @RequestMapping(method = {RequestMethod.GET, RequestMethod.HEAD})
    public ModelAndView index() {    	
        return main();
    }
    
    @RequestMapping(value = "/index", method = {RequestMethod.GET, RequestMethod.HEAD})
    public ModelAndView main() {
        ModelAndView mav = new ModelAndView("/index");

        return mav;
    }
    
}