package encore.web.beans;

import java.util.ArrayList;
import java.util.List;

public class JsonTreeDataBean {

	private String text;
	private String id;
	private String pid;
	private String abbr;
	private String description;
	private boolean expanded;
	boolean leaf;
	List children;
	
	public JsonTreeDataBean() {
		this.children = new ArrayList();
	}
	
	public String getPid() {
		return pid;
	}
	
	public void setPid(String pid) {
		this.pid = pid;
	}
	
	
	public String getText() {
		return text;
	}

	public void setText(String name) {
		this.text = name;
	}

	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getAbbr() {
		return abbr;
	}

	public void setAbbr(String abbr) {
		this.abbr = abbr;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isExpanded() {
		return expanded;
	}

	public void setExpanded(boolean expanded) {
		this.expanded = expanded;
	}
	
	public boolean isLeaf() {
		return this.children.size() == 0;
	}
	
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	
	public List getChildren() {
		return children;
	}
	
	public void setChildren(List children) {
		this.children = children;
	}
	
}