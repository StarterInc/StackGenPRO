package io.starter.generio.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.time.OffsetDateTime;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 Order
 ############################## DO NOT EDIT: GENERATED FILE ##############################

    Generated by Starter Ignite: http://starter.io/ignite
    Powered by Swagger Codegen: http://swagger.io

	Template file: JavaSpring/pojo.mustache
	
############################## DO NOT EDIT: GENERATED FILE ##############################
 */

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-01-30T12:20:21.685-08:00")

public class Order  implements  io.starter.ignite.model.DataModelObject {

  @JsonProperty("id")
  public Long id = null;


  @JsonProperty("tradeId")
  public Long tradeId = null;


  @JsonProperty("quantity")
  public Integer quantity = null;


  @JsonProperty("executionDate")
  public OffsetDateTime executionDate = null;

  /**
   * Order Status
   */
  public enum StatusEnum {
    PLACED("placed"),
    
    APPROVED("approved"),
    
    EXECUTED("executed");

    private String value;

    StatusEnum(String value) {
      this.value = value;
    }

    @JsonValue
    public String getValue() {
      return value;
    }

    @Override
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static StatusEnum fromValue(String text) {
      for (StatusEnum b : StatusEnum.values()) {
        if (String.valueOf(b.value).equals(text)) {
          return b;
        }
      }
      return null;
    }
  }


  @JsonProperty("status")
  public StatusEnum status = null;


  @JsonProperty("complete")
  public Boolean complete = false;


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

  public Order id(Long id) {
    this.id = id;
    return this;
  }

   /**
   * Primary Key for Object (generated)
   * @return id
  **/


  @ApiModelProperty(      value = "Primary Key for Object (generated)")
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Order tradeId(Long tradeId) {
    this.tradeId = tradeId;
    return this;
  }

   /**
   * Get tradeId
   * @return tradeId
  **/


  @ApiModelProperty(      value = "")
  public Long getTradeId() {
    return tradeId;
  }

  public void setTradeId(Long tradeId) {
    this.tradeId = tradeId;
  }

  public Order quantity(Integer quantity) {
    this.quantity = quantity;
    return this;
  }

   /**
   * Get quantity
   * @return quantity
  **/


  @ApiModelProperty(      value = "")
  public Integer getQuantity() {
    return quantity;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }

  public Order executionDate(OffsetDateTime executionDate) {
    this.executionDate = executionDate;
    return this;
  }

   /**
   * Get executionDate
   * @return executionDate
  **/

  @Valid

  @ApiModelProperty(      value = "")
  public OffsetDateTime getExecutionDate() {
    return executionDate;
  }

  public void setExecutionDate(OffsetDateTime executionDate) {
    this.executionDate = executionDate;
  }

  public Order status(StatusEnum status) {
    this.status = status;
    return this;
  }

   /**
   * Order Status
   * @return status
  **/


  @ApiModelProperty(      value = "Order Status")
  public StatusEnum getStatus() {
    return status;
  }

  public void setStatus(StatusEnum status) {
    this.status = status;
  }

  public Order complete(Boolean complete) {
    this.complete = complete;
    return this;
  }

   /**
   * Get complete
   * @return complete
  **/


  @ApiModelProperty(      value = "")
  public Boolean isComplete() {
    return complete;
  }

  public void setComplete(Boolean complete) {
    this.complete = complete;
  }

  public Order keyVersion(Long keyVersion) {
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

  public Order keySpec(String keySpec) {
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

  public Order ownerId(Long ownerId) {
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

  public Order createdDate(OffsetDateTime createdDate) {
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

  public Order modifiedDate(OffsetDateTime modifiedDate) {
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
    Order order = (Order) o;
    return Objects.equals(this.id, order.id) &&
        Objects.equals(this.tradeId, order.tradeId) &&
        Objects.equals(this.quantity, order.quantity) &&
        Objects.equals(this.executionDate, order.executionDate) &&
        Objects.equals(this.status, order.status) &&
        Objects.equals(this.complete, order.complete) &&
        Objects.equals(this.keyVersion, order.keyVersion) &&
        Objects.equals(this.keySpec, order.keySpec) &&
        Objects.equals(this.ownerId, order.ownerId) &&
        Objects.equals(this.createdDate, order.createdDate) &&
        Objects.equals(this.modifiedDate, order.modifiedDate);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, tradeId, quantity, executionDate, status, complete, keyVersion, keySpec, ownerId, createdDate, modifiedDate);
  }


  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Order {\n");
    
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    tradeId: ").append(toIndentedString(tradeId)).append("\n");
    sb.append("    quantity: ").append(toIndentedString(quantity)).append("\n");
    sb.append("    executionDate: ").append(toIndentedString(executionDate)).append("\n");
    sb.append("    status: ").append(toIndentedString(status)).append("\n");
    sb.append("    complete: ").append(toIndentedString(complete)).append("\n");
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

