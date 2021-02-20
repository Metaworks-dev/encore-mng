package encore.web.beans;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

public class FileUploadBean {

	private CommonsMultipartFile file;
	private String svc;
	private String sql;

	public CommonsMultipartFile getFile() {
		return file;
	}

	public void setFile(CommonsMultipartFile file) {
		this.file = file;
	}

	public String getSvc() {
		return svc;
	}

	public void setSvc(String svc) {
		this.svc = svc;
	}

	public String getSql() {
		return sql;
	}

	public void setSql(String sql) {
		this.sql = sql;
	}

}
