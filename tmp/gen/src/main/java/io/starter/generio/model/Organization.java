package io.starter.generio.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.time.OffsetDateTime;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 Organization
 ############################## DO NOT EDIT: GENERATED FILE ##############################

    Generated by Starter Ignite: http://starter.io/ignite
    Powered by Swagger Codegen: http://swagger.io

	Template file: JavaSpring/pojo.mustache
	
############################## DO NOT EDIT: GENERATED FILE ##############################
 */

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-01-30T12:20:21.685-08:00")

public class Organization  implements  io.starter.ignite.model.DataModelObject {

  @JsonProperty("id")
  public Long id = null;


  @JsonProperty("name")
  public String name = null;


  @JsonProperty("homePage")
  public String homePage = null;


  @JsonProperty("phone")
  public String phone = null;


  @JsonProperty("keyVersion")
  public Long keyVersion = null;


  @JsonProperty("keySpec")
  public String keySpec = "dev";


  @JsonProperty("ownerId")
  public Long ownerId = null;


  @JsonProperty("createdDate")
  public OffsetDateTime createdDate = null;


  @JsonProperty("modifiedDate")
  public OffsetDateTime modifiedDate = null;

  public Organization id(Long id) {
    this.id = id;
    return this;
  }

   /**
   * Primary Key for Object (generated)
   * @return id
  **/
  @NotNull


  @ApiModelProperty(      required = true, value = "Primary Key for Object (generated)")
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Organization name(String name) {
    this.name = name;
    return this;
  }

   /**
   * Get name
   * @return name
  **/
  @NotNull


  @ApiModelProperty(example = "ACME Corporation",       required = true, value = "")
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Organization homePage(String homePage) {
    this.homePage = homePage;
    return this;
  }

   /**
   * Get homePage
   * @return homePage
  **/


  @ApiModelProperty(example = "https://www.acme-corp.com",       value = "")
  public String getHomePage() {
    return homePage;
  }

  public void setHomePage(String homePage) {
    this.homePage = homePage;
  }

  public Organization phone(String phone) {
    this.phone = phone;
    return this;
  }

   /**
   * Get phone
   * @return phone
  **/


  @ApiModelProperty(example = "408-867-5309",       value = "")
  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public Organization keyVersion(Long keyVersion) {
    this.keyVersion = keyVersion;
    return this;
  }

   /**
   * The version of the SecureField key used to crypt this row (generated)
   * @return keyVersion
  **/


  @ApiModelProperty(      value = "The version of the SecureField key used to crypt this row (generated)")
  public Long getKeyVersion() {
    return keyVersion;
  }

  public void setKeyVersion(Long keyVersion) {
    this.keyVersion = keyVersion;
  }

  public Organization keySpec(String keySpec) {
    this.keySpec = keySpec;
    return this;
  }

   /**
   * The spec of the SecureField key used to crypt this row (generated)
   * @return keySpec
  **/


  @ApiModelProperty(example = "{keyOwner:111, keySource:'session | system'}",       value = "The spec of the SecureField key used to crypt this row (generated)")
  public String getKeySpec() {
    return keySpec;
  }

  public void setKeySpec(String keySpec) {
    this.keySpec = keySpec;
  }

  public Organization ownerId(Long ownerId) {
    this.ownerId = ownerId;
    return this;
  }

   /**
   * The ID of the user that owns this data (generated)
   * @return ownerId
  **/


  @ApiModelProperty(      value = "The ID of the user that owns this data (generated)")
  public Long getOwnerId() {
    return ownerId;
  }

  public void setOwnerId(Long ownerId) {
    this.ownerId = ownerId;
  }

  public Organization createdDate(OffsetDateTime createdDate) {
    this.createdDate = createdDate;
    return this;
  }

   /**
   * The created date for this record/object (generated)
   * @return createdDate
  **/

  @Valid

  @ApiModelProperty(      value = "The created date for this record/object (generated)")
  public OffsetDateTime getCreatedDate() {
    return createdDate;
  }

  public void setCreatedDate(OffsetDateTime createdDate) {
    this.createdDate = createdDate;
  }

  public Organization modifiedDate(OffsetDateTime modifiedDate) {
    this.modifiedDate = modifiedDate;
    return this;
  }

   /**
   * The last-modified date for this record/object (generated)
   * @return modifiedDate
  **/

  @Valid

  @ApiModelProperty(      value = "The last-modified date for this record/object (generated)")
  public OffsetDateTime getModifiedDate() {
    return modifiedDate;
  }

  public void setModifiedDate(OffsetDateTime modifiedDate) {
    this.modifiedDate = modifiedDate;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Organization organization = (Organization) o;
    return Objects.equals(this.id, organization.id) &&
        Objects.equals(this.name, organization.name) &&
        Objects.equals(this.homePage, organization.homePage) &&
        Objects.equals(this.phone, organization.phone) &&
        Objects.equals(this.keyVersion, organization.keyVersion) &&
        Objects.equals(this.keySpec, organization.keySpec) &&
        Objects.equals(this.ownerId, organization.ownerId) &&
        Objects.equals(this.createdDate, organization.createdDate) &&
        Objects.equals(this.modifiedDate, organization.modifiedDate);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name, homePage, phone, keyVersion, keySpec, ownerId, createdDate, modifiedDate);
  }


  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Organization {\n");
    
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    homePage: ").append(toIndentedString(homePage)).append("\n");
    sb.append("    phone: ").append(toIndentedString(phone)).append("\n");
    sb.append("    keyVersion: ").append(toIndentedString(keyVersion)).append("\n");
    sb.append("    keySpec: ").append(toIndentedString(keySpec)).append("\n");
    sb.append("    ownerId: ").append(toIndentedString(ownerId)).append("\n");
    sb.append("    createdDate: ").append(toIndentedString(createdDate)).append("\n");
    sb.append("    modifiedDate: ").append(toIndentedString(modifiedDate)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
  * Starter Ignite JSON method
  */
  @Override
  public String toJSON() {
    String ret =  new org.json.JSONObject(this).toString();
    ret = ret.replace("\\\"","\"");
    ret = ret.replace("\"}\"", "\"}");
    return ret;
  }
  
  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }

}

